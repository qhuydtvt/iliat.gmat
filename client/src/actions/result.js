import _ from 'lodash';

export const CHECK_ANSWERS = 'CHECK_ANSWERS';


export function checkAnswers(questionPack, answers, totalTime) {
  const questionDict = _.mapKeys(questionPack.questions, "_id");
  const answersWithResult = answers.map((answer, index) => {
    const question = questionDict[answer.questionId];
    return {
      ...answer,
      question: _.cloneDeep(question),
      isCorrect: answer.userChoice === question.rightChoice
    };
  });
  const correctAnswerCount = answersWithResult.filter(answer => answer.isCorrect).length;
  const correctPercentage = (correctAnswerCount / answers.length) * 100;
  return {
    type: CHECK_ANSWERS,
    payload: { questionPack, answers: answersWithResult, totalTime, correctAnswerCount, correctPercentage }
  };
}