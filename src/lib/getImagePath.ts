export const getImagePath = (imagePath?: string, fullSize?: boolean) => {
  return imagePath
    ? `http://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}/${imagePath}`
    : "https://i.ibb.co/vVvBpzZ/360-F-482375378-9q1-OVUTCIKY029-UGNh-W0vb-OG6b-Nu-K3-SX.jpg";
};
