'use strict';
const sharp = require('sharp');
const fs = require('fs');

const CONTAINER_URL = '/api/containers/';

module.exports = function (PostImage) {
    PostImage.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source: 'context' } },
                { arg: 'options', type: 'object', http: { source: 'query' } },
                { arg: 'access_token', type: 'string' },
                { arg: 'post_id', type: 'string' },
                { arg: 'user_id', type: 'string' }
            ],
            returns: {
                arg: 'file_object',
                type: 'object',
                root: true
            },
            http: { verb: 'post' }
        }
    );

    PostImage.upload = function (ctx, options, access_token, post_id, user_id, callback) {
        if (!options) options = {};
        ctx.req.params.container = 'postImages';
        if (!fs.existsSync(`./server/storage/${ctx.req.params.container}`)) {
            fs.mkdirSync(`./server/storage/${ctx.req.params.container}`);
        }

        PostImage.app.models.ImageFile.upload(ctq.req, ctx.result, options, (err, file) => {
            if (err) {
                callback(err);
            } else {
                var fileInfo = file.files.file[0];
                sharp(`./server/storage/${ctx.req.params.container}/${fileInfo.name}`)
                    .resize(100)
                    .toFile(`./server/storage/${ctx.req.params.container}/100-${file.name}`, (error) => {
                        if (!error) {
                            PostImage.create({
                                url: `${CONTAINER_URL}${fileInfo.container}/download/${fileInfo.name}`,
                                thumbnail: `${CONTAINER_URL}${fileInfo.container}/download/100-${fileInfo.name}`,
                                created_at: new Date(),
                                postId: post_id,
                                userId: user_id,
                            }, (e, image) => {
                                if (e) {
                                    callback(e);
                                } else {
                                    callback(null, image);
                                }
                            });
                        }
                    });
            }
        });
    };
};
