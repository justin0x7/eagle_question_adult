import React from "react";

// rating
import veryGoodIconImage from "./images/rating/very-good.png";
import goodIconImage from "./images/rating/good.png";
import okayIconImage from "./images/rating/okay.png";
import notGoodIconImage from "./images/rating/not-good.png";
import notGoodAtAllIconImage from "./images/rating/not-good-at-all.png";

export const VeryGoodIconImage = () => <img src={veryGoodIconImage} alt="veryGoodIconImage" />;
export const GoodIconImage = () => <img src={goodIconImage} alt="goodIconImage" />;
export const OkayIconImage = () => <img src={okayIconImage} alt="okayIconImage" />;
export const NotGoodIconImage = () => <img src={notGoodIconImage} alt="notGoodIconImage" />;
export const NotGoodAtAllIconImage = () => <img src={notGoodAtAllIconImage} alt="notGoodAtAllIconImage" />;