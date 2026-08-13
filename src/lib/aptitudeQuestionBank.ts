export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Generates 30 structured, high-quality Aptitude questions for each topic
export const getAptitudeTopicQuestions = (topicKey: string): QuizQuestion[] => {
  switch (topicKey) {
    case 'number_system': {
      const qList: QuizQuestion[] = [];
      const divisibilityData = [
        { num: 144, d: 9, ans: 0, exp: '1+4+4 = 9 which is divisible by 9.' },
        { num: 256, d: 4, ans: 0, exp: 'Last two digits 56 is divisible by 4.' },
        { num: 343, d: 7, ans: 0, exp: '343 = 7^3, divisible by 7.' },
        { num: 512, d: 8, ans: 0, exp: '512 is 8^3, divisible by 8.' },
      ];

      for (let i = 1; i <= 30; i++) {
        if (i % 5 === 1) {
          const n = (i * 17) % 50 + 10;
          qList.push({
            id: i,
            question: `Q${i}. What is the remainder when ${n * 13 + 4} is divided by 13?`,
            options: ['2', '4', '6', '0'],
            correctAnswer: 1,
            explanation: `(${n * 13} + 4) / 13 leaves a remainder of 4.`
          });
        } else if (i % 5 === 2) {
          qList.push({
            id: i,
            question: `Q${i}. What is the HCF of ${i * 12} and ${i * 18}?`,
            options: [`${i * 3}`, `${i * 6}`, `${i * 12}`, `${i * 2}`],
            correctAnswer: 1,
            explanation: `HCF(${i * 12}, ${i * 18}) = ${i} * HCF(12, 18) = ${i * 6}.`
          });
        } else if (i % 5 === 3) {
          qList.push({
            id: i,
            question: `Q${i}. What is the unit digit of 7^${i + 2}?`,
            options: ['7', '9', '3', '1'],
            correctAnswer: (i + 2) % 4 === 1 ? 0 : (i + 2) % 4 === 2 ? 1 : (i + 2) % 4 === 3 ? 2 : 3,
            explanation: 'Unit digit cycle for 7 is 7, 9, 3, 1 (period 4).'
          });
        } else if (i % 5 === 4) {
          qList.push({
            id: i,
            question: `Q${i}. Sum of first ${i + 5} natural numbers is:`,
            options: [
              `${((i + 5) * (i + 6)) / 2}`,
              `${((i + 5) * (i + 5)) / 2}`,
              `${((i + 5) * (i + 7)) / 2}`,
              `${(i + 5) * (i + 6)}`
            ],
            correctAnswer: 0,
            explanation: 'Formula for sum of first N natural numbers is N*(N+1)/2.'
          });
        } else {
          qList.push({
            id: i,
            question: `Q${i}. Find the smallest prime number greater than ${i * 3 + 10}.`,
            options: [`${i * 3 + 11}`, `${i * 3 + 13}`, `${i * 3 + 17}`, `${i * 3 + 19}`],
            correctAnswer: 0,
            explanation: 'Check divisibility by small primes 2, 3, 5, 7.'
          });
        }
      }
      return qList;
    }

    case 'clocks': {
      const qList: QuizQuestion[] = [];
      for (let i = 1; i <= 30; i++) {
        const hour = (i % 12) + 1;
        const minute = (i * 5) % 60;
        const angle = Math.abs(30 * hour - 5.5 * minute) % 360;
        const finalAngle = angle > 180 ? 360 - angle : angle;

        qList.push({
          id: i,
          question: `Q${i}. Find the angle between hour and minute hands at ${hour}:${minute < 10 ? '0' + minute : minute}.`,
          options: [
            `${finalAngle.toFixed(1)}°`,
            `${(finalAngle + 15).toFixed(1)}°`,
            `${Math.max(0, finalAngle - 10).toFixed(1)}°`,
            `${(finalAngle + 30).toFixed(1)}°`
          ],
          correctAnswer: 0,
          explanation: `Angle = |30 * Hour - 5.5 * Minutes| = |30*${hour} - 5.5*${minute}| = ${finalAngle.toFixed(1)}°.`
        });
      }
      return qList;
    }

    case 'direction': {
      const qList: QuizQuestion[] = [];
      const directions = ['North', 'East', 'South', 'West', 'North-East', 'South-West', 'North-West', 'South-East'];

      for (let i = 1; i <= 30; i++) {
        const d1 = i * 3;
        const d2 = i * 4;
        const hyp = Math.sqrt(d1 * d1 + d2 * d2);

        qList.push({
          id: i,
          question: `Q${i}. A person walks ${d1}m North, then turns East and walks ${d2}m. What is the shortest distance from the starting point?`,
          options: [`${hyp}m`, `${d1 + d2}m`, `${Math.round(hyp + 5)}m`, `${Math.round(hyp - 2)}m`],
          correctAnswer: 0,
          explanation: `By Pythagoras Theorem: Distance = √(d1² + d2²) = √(${d1 * d1} + ${d2 * d2}) = ${hyp}m.`
        });
      }
      return qList;
    }

    case 'ages': {
      const qList: QuizQuestion[] = [];
      for (let i = 1; i <= 30; i++) {
        const sonAge = i + 5;
        const fatherAge = sonAge * 3;
        const ratio = 3;

        qList.push({
          id: i,
          question: `Q${i}. A father is 3 times as old as his son. If the son is currently ${sonAge} years old, what was the father's age ${i} years ago?`,
          options: [`${fatherAge - i} years`, `${fatherAge} years`, `${fatherAge - i - 2} years`, `${fatherAge + i} years`],
          correctAnswer: 0,
          explanation: `Present father age = ${sonAge} * 3 = ${fatherAge}. ${i} years ago = ${fatherAge} - ${i} = ${fatherAge - i} years.`
        });
      }
      return qList;
    }

    case 'calendar': {
      const qList: QuizQuestion[] = [];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      for (let i = 1; i <= 30; i++) {
        const extraDays = (i * 3) % 7;
        const startDayIdx = i % 7;
        const targetDayIdx = (startDayIdx + extraDays) % 7;

        qList.push({
          id: i,
          question: `Q${i}. If today is ${days[startDayIdx]}, what day of the week will it be after ${i * 3} days?`,
          options: [
            `${days[targetDayIdx]}`,
            `${days[(targetDayIdx + 1) % 7]}`,
            `${days[(targetDayIdx + 6) % 7]}`,
            `${days[(targetDayIdx + 2) % 7]}`
          ],
          correctAnswer: 0,
          explanation: `Odd days = (${i * 3}) mod 7 = ${extraDays}. ${days[startDayIdx]} + ${extraDays} days = ${days[targetDayIdx]}.`
        });
      }
      return qList;
    }

    default:
      return [];
  }
};
