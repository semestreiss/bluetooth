const bluetooth = require('node-bluetooth');

const device = new bluetooth.DeviceINQ();
//device.listPairedDevices(console.log);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
  
readline.question(`Serial Port: `, (name) => {
    connect(name);
    readline.close()
});

function connect(name) {
    //48-4b-aa-1e-d1-7c
    bluetooth.connect(name, "2.4", function(err, connection){
        if(err){
            console.log("I can't found the device or this reject the connection\n");
            return console.error(err+"\n");
        } 

        connection.on('data', (buffer) => {
          console.log('received message:', buffer.toString());
        });

        connection.write(new Buffer('Hello!', 'utf-8'), () => {
            console.log("Success");
            
            setTimeout(() => {
                callTrigger();
            }, 2000);      
            
        });
    });
}

function callTrigger() {
    setTimeout(() => {
        console.log("Trigger !!!!");
        killProcess()
    }, 5000);
    
}

function killProcess() {
    console.log("Bye");
    process.exit(1);
}


