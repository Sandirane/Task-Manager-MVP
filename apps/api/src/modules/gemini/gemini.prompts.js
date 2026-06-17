const buildPrompt = (question, tasks) => {

    const formattedTasks = tasks
        .map(
            task =>
                `- ${task.title}
            Status : ${task.status}
            Priority : ${task.priority}`
        )
        .join("\n");

    return `
    Tu es un assistant de gestion de tâches.

    Voici les tâches de l'utilisateur : 
    ${formattedTasks}
    Question : 
    ${question}
    Donne des conseils pratiques et organise les priorités.
`;

};

module.exports = {
    buildPrompt,
};