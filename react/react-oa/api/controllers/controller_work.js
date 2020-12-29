import fs from 'fs';
import path from 'path';
const dir = path.join(__dirname, '../../work/');

export const saveWork = async (req, res) => {
    let {data} = req.body;
    console.log('data:', data);
    fs.readFile(dir + '/temp.txt', 'utf8', (err, file) => {
        if (err) console.log(err);
        // let s = 'ss';
        // s.replace(/\$org/)
        let str = file
            .replace('$content', data.work['请假事由'])
            .replace('$type', data.work['请假类型'])
            .replace(/\$orgName/g, data.user.nickname)
            .replace('$sectorName', data.user.sector)
            .replace('$sectorId', data.user.sector)
            .replace('$start', data.work['开始时间'])
            .replace('$end', data.work['结束时间'])
            .replace('$time', data.work['请假天数'])
            .replace('$orgId', data.user_id);
        fs.writeFile(path.join(dir, '/liyi/submit.json'), str, err => {
            if (err) console.log(err);
        })
    })
    // fs.mkdir(dir, err => {
    //     if (err) console.log(err);
    //     fs.writeFile(path.join(dir, 'list.json'), JSON.stringify(data), err => {
    //         if (err) console.log(err);
    //     })
    // });

    return res.json('hh')
}

export const getInstDetail = async (req, res) => {
    fs.readFile(path.join(dir, '/liyi/submit.json'), 'utf8', (err, file) => {
        if (err) throw err;
        let r = JSON.parse(file);
        console.log(r.data.formData.procInstTitle);
        return res.json(r.data);
    })
}