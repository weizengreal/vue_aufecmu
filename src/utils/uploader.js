import axios from 'axios';

const uploader = function(file) {
    return new Promise((resolve, reject) => {
        axios.get('//api.aufe.vip/common/getQnToken').then(res => {
            let Token = res.data.uptoken;
            console.log(Token)
            let data = new FormData();
            data.append('token', Token);
            data.append('file', file);
            axios.post('https://upload.qbox.me', data).then((res) => {
                resolve(res)
            }).catch(() => {
                reject();
            })
        }).catch(() => {
            reject();
        })
    })
}

export default uploader;
