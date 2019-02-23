var models = require('../models');
exports.getAll = async function getQuota(req, res) {
    var query = req.query,
        params = req.body,
        response = {
            success: false
        }; 
    var params = req.body;
    var searchQuery = {}, sortQuery = {};
    if (query.search) {
        searchQuery = {
            $or :[
                {
                    name :{
                    $regex: query.search,
                    $options: "i"}
                }, {
                    artists :{
                    $regex: query.search,
                    $options: "i"}
                }
            ]
        }
    }
    if (query.sortOn) {
        sortQuery[query.sortOn] = query.order || -1;
    }
    let page = Number(req.query.page || 1),
        limit = Number(req.query.limit || 50);
    page = (page <= 0) ? 1 : page;
    let skip = (page - 1) * limit;
    try {
        
        let songs = await models.Songs.find(searchQuery).skip(skip).limit(limit).sort(sortQuery).exec();
        // let count = await models.Songs.countDocuments(searchQuery);
        // let total = await models.Songs.countDocuments();
        return res.json({success:true,data:{
            songs:songs,
            // pagination : {
            //     page: page,
            //     limit: limit,
            //     count: count,
            //     total: total
            // }
        }});
    } catch (err) {
        console.log(err)
        return res.status(422).json({ success: false, error:'INVALID_REQUEST' });
    }
}