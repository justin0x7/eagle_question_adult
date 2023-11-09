import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SouthIcon from '@mui/icons-material/South';
import { Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "../core/components/button/Button";
import { VasRatingButton } from '../core/components/button/VASRating';

interface Props {
  orsData: {
    title: string;
    description: string;
  }[];
  // satisfactionScaleData: string[];
  orsAndSatisfactionScaleAnswers: number[];
  setOrsAndSatisfactionScaleAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  // setShowScore15Page: React.Dispatch<React.SetStateAction<boolean>>;
  onNextSatisfaction: () => void;
}

export default function VASScalePage({
  orsData,
  // satisfactionScaleData,
  orsAndSatisfactionScaleAnswers,
  setOrsAndSatisfactionScaleAnswers,
  // setShowScore15Page,
  onNextSatisfaction
}: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [checkAnswer, setCheckAnswer] = useState<Array<boolean>>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    scrollableDivRef.current?.querySelector("#questionnaire-card-" + (step))?.scrollIntoView({
      behavior: "smooth",
    });
  }, [scrollableDivRef, step]);

  const handleChange = (questionnaireIndex: number, newValue: number) => {
    const newAnswers = [...orsAndSatisfactionScaleAnswers];
    newAnswers[questionnaireIndex] = newValue;
    setOrsAndSatisfactionScaleAnswers(newAnswers);
    setCheckAnswer(prevState => {
      const updatedCheckAnswer = [...prevState];
      updatedCheckAnswer[questionnaireIndex] = true;
      return updatedCheckAnswer;
    });
  };
  // console.log("orsAndSatisfactionScaleAnswers", orsAndSatisfactionScaleAnswers)

  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    setShowDescription(!showDescription);
  };
  const upStep = () => {
    setStep(step - 1)
  }
  const downStep = (indexNum: number) => {
    if (checkAnswer[indexNum] === true) {
      // setDisregarded(true)
      setStep(step + 1)
      console.log("yyyyyyyyyyyy", checkAnswer[0], checkAnswer[1], checkAnswer[2], indexNum)

    }
    else {
      // setDisregarded(false)
      setCheckAnswer(prevState => {
        const updatedCheckAnswer = [...prevState];
        updatedCheckAnswer[indexNum] = false;
        return updatedCheckAnswer;
      });
      console.log("yyyyyyyyyyyy", checkAnswer[0], checkAnswer[1], checkAnswer[2], indexNum)

    }
  }

  // const handleClickPrev = () => {
  //   if (activeScore15QuestionnaireIndex === 0) return;
  //   scrollableDivRef.current?.querySelector("#questionnaire-card-" + (activeScore15QuestionnaireIndex))?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
  //   setActiveScore15QuestionnaireIndex(activeScore15QuestionnaireIndex - 1);
  // };

  return (
    <Container sx={{ maxWidth: "768px", backgroundColor: "#fafafa" }}>
      <Typography variant="h4" align="center" color="success.main" fontWeight="bold" p={6}>VAS

      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="#FF0000" fontWeight="bold">
          {/* {t("Label.TotalDisappointment")} */}
        </Typography>
        <Typography variant="h5" color="#4BDE51" fontWeight="bold">
          {/* {t("Label.TotalDisgust")} */}
          <Fab size="small" sx={{ position: "relative", bottom: "130px", height: "17px", width: "36px" }} color="primary" aria-label="add" onClick={handleClickOpen} >
            <QuestionMarkIcon />
          </Fab>

        </Typography>
      </Stack>

      <Stack gap={3} ref={scrollableDivRef}>
        {orsData.map((data, index) => (
          <Card key={index} id={`questionnaire-card-${index}`} sx={{
            overflow: "initial",
            pointerEvents: index === step ? "auto" : "none",
            boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.04)",
            backgroundColor: "rgba(66, 65, 65, 0.01)",
            borderRadius: "0px 40px 40px 0px",
            position: "relative",
            '&::after': {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backdropFilter: "blur(3.5px)",
              display: index === step ? "none" : "block",
            },
            // visibility: index !== step ? "hidden" : "visible"
          }}>
            <CardContent>
              <Stack key={index} gap={1} sx={{
                // opacity: step === index ? 1 : 0.2,
                pointerEvents: index === step ? 'auto' : 'none'
              }} >
                <Typography sx={{ visibility: step !== index ? "hidden" : "visible" }}>{`${(index + 1).toString().padStart(orsData.length.toString().length, '0')}/${orsData.length}`}</Typography>
                <BorderLinearProgress
                  sx={{ visibility: step !== index ? "hidden" : "visible" }}
                  variant='determinate'
                  value={(step === index ? index + 1 : 0) / orsData.length * 100}
                />
                <Typography fontWeight="bold" variant="h6">{data.title}</Typography>
                {step === index && (
                  // disregarded === false &&
                  checkAnswer[step] === false &&
                  <Typography color="error" fontSize={12}>* {t("Word.Required")}.</Typography>)
                }
                {/* {!showDescription && (
              <Typography fontWeight="bold" variant="h6">{data.description}</Typography>
            )} */}
                {/* <Slider
              value={orsAndSatisfactionScaleAnswers[index] || 0}
              onChange={(_e, newVal) => handleChange(index, newVal as number)}
              valueLabelDisplay="off"
              step={1}
              marks={orsMarks}
              min={0}
              max={10}
            /> */}
                <StyledRating>
                  {[...Array(5)].map((_it, index1) => (
                    <VasRatingButton
                      key={index1}
                      isSelected={orsAndSatisfactionScaleAnswers[index] === (index1 + 1)}
                      value={index1 + 1}
                      onChange={(newValue: number) => handleChange(index, newValue)}
                    />
                  ))}

                </StyledRating>
                <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
                  <Button onClick={upStep} sx={{ visibility: index !== step || index === 0 ? "hidden" : "visible" }}>
                    <ArrowCircleUpIcon />
                  </Button>
                  {/* {t(index === orsData.length - 1 ? "Action.GoToORS" : "Action.Next")} */}
                  {index === orsData.length - 1 ? (
                    <>
                      {/* <Button
                    variant="contained"
                    onClick={() => setShowScore15Page(true)}
                    sx={{
                      borderRadius: "100%",
                      minWidth: "56px",
                      backgroundColor: "#FFFFFF",
                      '&:hover': {
                        backgroundColor: "#dadada"
                      }
                    }}
                  >
                    <KeyboardBackspaceIcon color="success" />
                  </Button> */}
                      {checkAnswer[step] !== true
                        ? <ButtonPrimary onClick={() => downStep(step)}>{t("Action.GoToSatisfaction")}</ButtonPrimary>
                        : <ButtonPrimary onClick={() => onNextSatisfaction()}>{t("Action.GoToSatisfaction")}</ButtonPrimary>
                      }
                    </>
                  ) : (
                    <ButtonPrimary onClick={() => downStep(step)} endIcon={<SouthIcon />} sx={{ textTransform: "capitalize" }}>
                      {t("Action.Next")}
                    </ButtonPrimary>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Satisfaction Scale is not for v1.0 */}

      {/* <Typography variant="h4" align="center" color="success.main" fontWeight="bold" p={6}>{t("Title.TheSatisfactionScale")}</Typography>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="#FF0000" fontWeight="bold">{t("Label.TotalDisappointment")}</Typography>
        <Typography variant="h5" color="#4BDE51" fontWeight="bold">{t("Label.TotalDisgust")}</Typography>
      </Stack>

      <Stack gap={3}>
        {satisfactionScaleData.map((data, index) => (
          <Stack alignItems="center" key={index} gap={2}>
            <Typography fontWeight="bold" variant="h6">{data}</Typography>
            <Slider
              valueLabelDisplay="off"
              value={orsAndSatisfactionScaleAnswers[orsData.length + index]}
              onChange={(_e, newVal) => handleChange(orsData.length + index, newVal as number)}
              step={1}
              marks={satisfactionScaleMarks}
              min={1}
              max={10}
            />
          </Stack>
        ))}
      </Stack> */}


      <Stack direction="row" justifyContent="center" m={4} gap={4}>

      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("ORS.DescribeTitle")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("ORS.DescribeSentences")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("ORS.GotIt")}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const StyledRating = styled(Stack)({
  border: "none",
  '& .active': {
    border: "1px solid #2BBA42",
  },
  flexDirection: "column",
  gap: "16px",
  justifyContent: "space-between",
  width: "100%",
  padding: "16px",
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#D1D1D1",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#60A9FF",
  },
}));