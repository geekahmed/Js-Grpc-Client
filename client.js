const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todo_package;

// const text = process.argv[2];
// console.log(todoPackage)
const client = new todoPackage.TodoServices("localhost:50052", 
grpc.credentials.createInsecure())
// console.log(text)

client.CreateTodo({
    "title": "This is a title",
    "description": "New Description"
}, (err, response) => {
    console.log("Recieved from server " + JSON.stringify(response))

})
/*
client.readTodos(null, (err, response) => {
    console.log("read the todos from server " + JSON.stringify(response))
    if (!response.items)
        response.items.forEach(a=>console.log(a.text));
})
*/

/*
const call = client.readTodosStream();
call.on("data", item => {
    console.log("received item from server " + JSON.stringify(item))
})

call.on("end", e => console.log("server done!"))
*/