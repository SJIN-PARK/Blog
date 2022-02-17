const path = require('path');

const AWS = require('aws-sdk');
const model = require('./model');

AWS.config.loadFromPath(
    path.join(__dirname, 'config', 'awsConfig.json')
// RDS 보안 정보가 담긴 awsConfig.json 파일의 경로와 이름을 알맞게 기입합니다.
  );

  module.exports = {
      
    needs: () => upload,
    api : {
        getData : (req, res) => {
            model.api.getData( data => {
                return res.send( data )
            })
        },

        addData : (req, res) => {
            
        },

        modifyData : (req, res) => {
            
        },

        deleteData : (req, res) => {
            
        },
    }
}

