const { Comment, Image } = require('../models/index');

async function imageCounter() {
    return await Image.countDocuments();
}

async function commentsCounter() {
    return await Comment.countDocuments();
}

async function imageTotalViewsCounter() {
    const hay = await Image.find();
    if (hay.length>0){
        const result = await Image.aggregate([{
            $group: {
                _id: '1',
                viewsTotal: {$sum: '$views'}
            }
        }]);
        return result[0].viewsTotal;
    } else {
        return [];
    }
}

async function likesTotalCounter () {
    const hay = await Image.find();
    if (hay.length>0){
        const result = await Image.aggregate([{
            $group: {
                _id: '1',
                likesTotal: {$sum: '$like'}
            }
        }]);
        return result[0].likesTotal;
    } else {
        return [];
    }
}

module.exports = async () => {

    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}