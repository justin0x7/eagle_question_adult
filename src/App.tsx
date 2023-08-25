import axios from "axios";
import dayjs from 'dayjs';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { API_URL } from './core/constants/base.const';
import OrsAndSatisfactionScalePage from './pages/OrsAndSatisfactionScalePage';
import Score15Page from './pages/Score15Page';

type ScoreEntity = {
  codeNumber: string;
  person: 1 | 2 | 3;
  occasion: 1 | 2 | 3;
  date: string;
  score15: number;
  ors: number;
};

export default function App() {
  const { t } = useTranslation();

  const [scoreEntity, setScoreEntity] = useState<ScoreEntity>();
  const [showScore15Page, setShowScore15Page] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // static title & descriptions
  const score15Data = [
    t("Score15-1"),
    t("Score15-2"),
    t("Score15-3"),
    t("Score15-4"),
    t("Score15-5"),
    t("Score15-6"),
    t("Score15-7"),
    t("Score15-8"),
    t("Score15-9"),
    t("Score15-10"),
    t("Score15-11"),
    t("Score15-12"),
    t("Score15-13"),
    t("Score15-14"),
    t("Score15-15"),
  ];
  const orsData = [
    {
      title: t("ORS.Feeling1"),
      description: t("ORS.Individual")
    },    
    {
      title: t("ORS.Feeling2"),
      description: t("ORS.CloseRelationships")
    },
    {
      title: t("ORS.Feeling3"),
      description: t("ORS.Social")
    },
    {
      title: t("ORS.Feeling4"),
      description: t("ORS.Generally")
    },
  ];
  const satisfactionScaleData = [
    t("TSS.Accommodation"),
    t("TSS.PhysicalHealth"),
    t("TSS.Work"),
    t("TSS.Economy"),
    t("TSS.Alcohol"),
    t("TSS.Drug"),
    t("TSS.Game"),
    t("TSS.LegalIssues"),
    t("TSS.FamilySocialInteraction"),
    t("TSS.FreeTime"),
    t("TSS.PystoneHealth"),
    t("TSS.Communication"),
    t("TSS.GeneralWellBeing"),
  ];

  const [score15Answers, setScore15Answers] = useState<Array<number>>([...Array(score15Data.length)].map(_v => 0));
  const [activeScore15QuestionnaireIndex, setActiveScore15QuestionnaireIndex] = useState(0);
  const [orsAndSatisfactionScaleAnswers, setOrsAndSatisfactionScaleAnswers] = useState<Array<number>>([
    ...[...Array(orsData.length)].map(_v => 0),
    // Satisfaction Scale is not for v1.0
    // ...[...Array(satisfactionScaleData.length)].map(_v => 1),
  ]);

  const toNumberArray = useCallback((values: string[] | undefined) => {
    return values ? values.map(value => +value) : [];
  }, []);

  useEffect(() => {
    try {
      const z = JSON.parse(atob(atob(atob(window.location.pathname.substring(1)))));
      setScoreEntity(z);

      axios.get(
        `${API_URL}/score/getOne/${z.codeNumber}/${z.person}/${z.occasion}`
      ).then((res: any) => {
        setScore15Answers(toNumberArray(res.data.score15Answers));
        setOrsAndSatisfactionScaleAnswers(toNumberArray(res.data.orsAndSatisfactionScaleAnswers));
      }).catch(err => {
        console.log(err);
        setHasError(true);
      });
    }
    catch (e) {
      console.log(e);
      setHasError(true);
    }
  }, [toNumberArray]);

  const handleSubmit = () => {
    const ors = orsAndSatisfactionScaleAnswers.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    axios.post(
      `${API_URL}/score/create`,
      {
        ...scoreEntity,
        ors: +ors || 0,
        score15Answers,
        orsAndSatisfactionScaleAnswers,
        date: dayjs().format("YYYY-MM-DD")
      },
    ).then(res => {
      console.log(res);
      setSubmitted(true);
    }).catch(err => {
      console.log(err);
      setHasError(true);
    });
  };

  const updateScore15 = (newVal: number) => {
    if (scoreEntity) {
      setScoreEntity({
        ...scoreEntity,
        score15: newVal
      });
    }
  };

  if (scoreEntity?.codeNumber && scoreEntity?.occasion && scoreEntity?.person) {
    if (submitted) {
      return <div>{t("Message.SubmitSuccess")}</div>;
    }
    else if (hasError) {
      return <div>{t("Message.Error")}</div>;
    }
    else if (showScore15Page) {
      return (
        <Suspense fallback="Loading...">
          <Score15Page
            score15Data={score15Data}
            activeScore15QuestionnaireIndex={activeScore15QuestionnaireIndex}
            setActiveScore15QuestionnaireIndex={setActiveScore15QuestionnaireIndex}
            score15Answers={score15Answers}
            setScore15Answers={setScore15Answers}
            setScore15={updateScore15}
            setShowScore15Page={setShowScore15Page}
          />
        </Suspense>
      );
    }
    else {
      return (
        <Suspense fallback="Loading...">
          <OrsAndSatisfactionScalePage
            orsData={orsData}
            satisfactionScaleData={satisfactionScaleData}
            orsAndSatisfactionScaleAnswers={orsAndSatisfactionScaleAnswers}
            setOrsAndSatisfactionScaleAnswers={setOrsAndSatisfactionScaleAnswers}
            setShowScore15Page={setShowScore15Page}
            onSubmit={handleSubmit}
          />
        </Suspense>
      );
    }
  }
  return (
    <div>Loading...</div>
  );
}
