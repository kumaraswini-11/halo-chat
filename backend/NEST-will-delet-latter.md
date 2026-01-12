# NEST.JS LEARN

nest.js - build i on top of node.js, means under the hood it uses the node.js. also thre is tway to use is eitehr with express (default) or fast api.

npm i -g @nestjs/cli

nest new <project-name>

nest g module <module-name>
nest g controller <controller-name> (2 files cretd.) - controllerss are resposiable to handedl the incoming reqyuest and returing the response to the client.

nest g service <service-name> - is called provider (2 files crted - one servivce one , servidse.spec witch is test file )

decorators - are the functions with teh `@` symbol, that runs automatically when called

oreders of the routes are inporatant in controller

nest g resource <resource-name>
