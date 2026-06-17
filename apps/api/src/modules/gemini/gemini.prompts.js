const buildPrompt = (question) => `
Tu es un assistant de gestion de tâches.

Réponds toujours en français.

Question :

${question}
`;

module.exports = {
  buildPrompt,
};