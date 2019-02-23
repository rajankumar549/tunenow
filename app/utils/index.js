
class Utils {

	constructor() {

	}
    getQuery(data) {
        let result = {};
        _.each(data, function (value, key) {
            switch (key) {
                case 'id':
                    result._id = value;
                    break;
                case 'title':
                    value ? result.name = {
                        $regex: value,
                        $options: "i"
                    } : '';
                    break;
                case 'geo':
                    value ? result.geo = {
                        $regex: value,
                        $options: "i"
                    } : '';
                    break;
                case 'status':
                    value ? result.status = value : '';
                    break;
                case 'hops':
                    // switch() {
                    // 	case 'gte':
                    // 		result.hops = { $gte: value };
                    // 		break;
                    // 	case 'lte':
                    // 		result.hops = { $lte: value.count };
                    // 		break;
                    // 	default:
                    // 		result.hops = { $eq: value.count };
                    // }
                    value ? result.hops = {$gte: value} : '';
                    break;
                case 'os':
                    result.os = {
                        $regex: value,
                        $options: "i"
                    };
                    break;
                case 'type' :
                    if (value === 'automated') {
                        result.type = 'automated'
                    }
                    if (value === 'exported') {
                        result.type = {$ne: 'automated'}
                    }
                    break;
                case 'integration' :
                    value ? result.integrationId = value : '';
            }
        });
        return result;
    }
}
module.exports = new Utils();