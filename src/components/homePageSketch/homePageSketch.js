export const homePageSketch = (p5) => {
  const width = document.getElementById("p5div").offsetWidth;
  const height = document.getElementById("p5div").offsetHeight;

  var img;
  var theta = 0;

  p5.preload = () => {
    img = p5.loadImage("bsod.png");
  };

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
  };

  p5.draw = () => {
    p5.background(0);
    p5.orbitControl();
    p5.strokeWeight(0);
    p5.texture(img);
    p5.rotateZ(-p5.PI / 10);
    p5.rotateY(p5.millis() / 1000);
    p5.sphere(1000);

    theta += 0.05;
  };
};
