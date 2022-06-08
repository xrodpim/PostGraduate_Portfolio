const deviceModule = require('/home/rodrigopimenta/AWS_IOT_POS/node_modules/aws-iot-device-sdk').device;
                              
function processTest() { 
   // 
   // The device module exports an MQTT instance, which will attempt 
   // to connect to the AWS IoT endpoint configured in the arguments. 
   // Once connected, it will emit events which our application can 
   // handle. 
   // 
   const device = deviceModule({ 
      keyPath: 'private.key', 
      certPath: 'certificate.pem', 
      caPath: 'rootCA_3.txt', 
      clientId: 'Aluno-1', 
      region: 'us-east-one', // the AWS IoT region you will operate in (default 'us-east-1') 
                             // Região onde os certificados foram criados!
       
      baseReconnectTimeMs: '1000', 
      protocol: 'mqtts', 
      port: '8883', 
      host: 'a91cdtjena4dx-ats.iot.us-east-1.amazonaws.com' //Copiado HTTPS endPoint 
   }); 

    //Esse código usa REST e o endPoint acima, para invocar serviço. O HTTP usado leva mensagens de MQTT.
        //Dessa forma fica possível enviar dado para um tópico de fila, usando mensagens MQTT carregadas no HTTP.
        //o serviço REST no Gateway acata as mensagens HTTP e sabe o que fazer com o conteúdo MQTT.

    console.log('preparando...');
   // 
   // Do a simple publish demo 
   device 
      .on('connect', function() { 
         console.log('connect'); 
         device.publish('$aws/things/COISA_LIXO/shadow/update', 
            JSON.stringify(
              {
                "nome" : "Pimenta", "fone" : "+5535999386640"
              }
            ) 
         ); 
          console.log('Mensagem foi publicada!'); 
      }); 
   device
      .on('close', function() {
         console.log('close');
      });
   device
      .on('reconnect', function() {
         console.log('reconnect');
      });
   device
      .on('offline', function() {
         console.log('offline');
     });
  device
      .on('error', function(error) {
         console.log('error', error);
      });
   device
      .on('message', function(topic, payload) {
         console.log('message', topic, payload.toString());
      });

} 
processTest();
