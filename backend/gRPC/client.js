const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    'helloworld.proto',
    {keepCase: true, longs: String, enums: String, defaults: true, oneofs: true}
);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  const client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
  client.SayHello({name: 'world'}, function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log('Greeting:', response.message);
    }
  });
}

main();