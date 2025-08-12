const fastify = require('fastify');
const crypto = require('crypto');


const server = fastify();

const courses = [
    {id: '1', title: 'Curso NodeJS'},
    {id: '2', title: 'Curso React'},
    {id: '3', title: 'Curso React Native'},
]

server.get('/courses', () => {
    return { courses, page: 1};
});


server.post('/courses', (request, replay) => {

    const courseId = crypto.randomUUID()
    const { courseTitle } = request.body.title

    if (!courseTitle) {
      return replay.status(400).send({message: 'Titulo obrigatorio'})
    }

    courses.push({id: courseId, title: courseTitle});

    replay.status(201).send({courseId});
});

server.get('/courses/:id', (request, replay) => {
    const courseId = request.params.id;
    const course = courses.find(course => course.id === courseId)

    if(course) {
        return { course };
    }

    return replay.status(404).send();
})

server.listen({port: 3333}).then(() => {
    console.log('Http server running!')
}) 

