/* TYPING STUFF */

const text = () => document.getElementById("text");

let l0, h0, t0;
document.addEventListener("DOMContentLoaded", () => {
  l0 = text().innerText.length; // initial length (chars)

  // initial div#text
  const parser = new DOMParser();
  const html = text().outerHTML;
  h0 = parser.parseFromString(html, "text/html");
  t0 = h0.getElementById("text");

  text().innerHTML = ""; // remove all text

  // buttons
  const openExplainer = document.getElementById("openExplainer");
  const closeExplainer = document.getElementById("closeExplainer");
  const explainer = document.getElementById("explainer");

  openExplainer.addEventListener("click", function () {
    explainer.classList.remove("hidden");
  })

  closeExplainer.addEventListener("click", function () {
    explainer.classList.add("hidden");
  })
});

// if this is true, there is less on the page
// than we want
const comparer = (frac) => {
  const l1 = text().innerText.length;
  return l1 / l0 < frac;
}

const speed = 12; // lower is faster

let timeout;

const removeText = (frac) => {
  let lC = text().lastChild;
  if (lC) {
    // locate very last child elem
    while (lC.hasChildNodes()) {
      lC = lC.lastChild;
    }
    if (lC.nodeType === 3) { // if it's text
      if (!lC.textContent) { // if no text content
        lC.remove();
      } else {
        // remove last letter
        lC.textContent = lC.textContent.slice(0, -1);
      }
    } else {
      lC.remove();
    }
  }

  if (!comparer(frac)) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return removeText(frac)
    }, speed);
  }
}

const addText = (frac) => {
  const writeNode = (n0, n1) => {
    const cN0 = n0.childNodes;
    const cN1 = n1.childNodes;

    for (let [i, oldNode] of cN0.entries()) {
      const newNode = cN1[i];
      // if node exists but is not equal to the old one
      if (newNode && !oldNode.isEqualNode(newNode)) {
        // if it's a text node
        switch (newNode.nodeType) {
          case 1: // <div> or other element, recursion
            writeNode(oldNode, newNode);
            break;
          case 3: // text node, insert a letter
            const l = oldNode.textContent.charAt(newNode.length);
            const newTextContent = newNode.textContent + l;
            newNode.textContent = newTextContent;
            break;
          default:
            newNode = oldNode.cloneNode(true);
          // code block
        }
        break;
      } // if it doesn't exist
      else if (!newNode) {
        let insert = oldNode.cloneNode(false);
        if (oldNode.nodeType === 3) {
          insert.textContent = "";
        }
        n1.appendChild(insert);
        break;
      } // else node exists -- move to next one
    }
  }

  writeNode(t0, text());

  if (comparer(frac)) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return addText(frac)
    }, speed);
  }

}

const typer = (frac) => {
  const needToAddText = comparer(frac);
  if (needToAddText) {
    addText(frac);
  } else {
    removeText(frac);
  }
}

const updateText = (puffsInZone) => {
  typer(puffsInZone / 10);
};







/* MATTER STUFF */

// Matter aliases
const {
  Bodies, Body, Composites, Engine, Mouse, MouseConstraint,
  Render, Runner, Vertices, World } = Matter;
Matter.use('matter-collision-events');

const init = function () {
  const container = document.getElementById("container");
  const { offsetWidth, offsetHeight } = container;

  container.innerHTML = "";

  // create engine
  const engine = Engine.create(),
    { world } = engine;

  // create renderer
  const render = Render.create({
    element: container,
    engine: engine,
    options: {
      // showAngleIndicator: true,
      // showVelocity: true,
      wireframes: false,
      pixelRatio: "auto",
      width: offsetWidth,
      height: offsetHeight,
      background: false,
    }
  });
  // console.log(render);

  Render.run(render);

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  // params
  const wallsize = 200;
  const min = Math.min(offsetWidth, offsetHeight);
  const circlesize = min / 12 - 4;
  const wallPrefs = { isStatic: true, render: { opacity: 0 } };

  const puffColours = ["#c16928", "#d4732c", "#d77f3f"];

  // add bodies
  const puffs = Composites.stack(
    6, 6, // x, y init location
    5, 2, // cols, rows
    2, 2, // colgap, rowgap
    function (x, y) {
      const colour = puffColours[Math.floor(Math.random() * Math.floor(3))];
      return Bodies.circle(x, y, circlesize, {
        render: {
          fillStyle: colour
        }
      });
    }
  );
  // console.log(puffs);

  const vertices = [
    { x: 0, y: 0 },
    { x: 20, y: 30 },
    { x: min / 1.5 - 20, y: 30 },
    { x: min / 1.5, y: 0 },
    { x: min / 1.5 - 15, y: 1 },
    { x: min / 1.5 - 30, y: 20 },
    { x: 30, y: 20 },
    { x: 15, y: 1 },
  ];

  const plate = Bodies.fromVertices(offsetWidth / 2, offsetHeight / 1.2,
    vertices, { isStatic: true, render: { fillStyle: "#7d98a1" } });

  const croqZone = Bodies.rectangle(
    offsetWidth / 2, offsetHeight / 2, min / 1.5, offsetHeight / 1.5,
    { isSensor: true, isStatic: true, opacity: 0, render: { opacity: 0.0 } }
  )

  let puffsInZone = [];
  croqZone.onCollide(pair => {
    puffsInZone.push(pair.id);
    updateText(puffsInZone.length);
  });
  croqZone.onCollideEnd(pair => {
    puffsInZone = puffsInZone.filter(id => id != pair.id);
    updateText(puffsInZone.length);
  });

  World.add(world, [
    // walls
    Bodies.rectangle( // top wall
      offsetWidth / 2, -wallsize / 2 + 5, offsetWidth, wallsize, wallPrefs),
    Bodies.rectangle( // right wall
      offsetWidth + wallsize / 2 - 5, offsetHeight / 2, wallsize, offsetHeight, wallPrefs),
    Bodies.rectangle( // bottom wall
      offsetWidth / 2, offsetHeight + wallsize / 2 - 5, offsetWidth, wallsize, wallPrefs),
    Bodies.rectangle( // left wall
      -wallsize / 2 + 5, offsetHeight / 2, wallsize, offsetHeight, wallPrefs),

    croqZone,
    plate,
    puffs
  ]);
  // console.log(world);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: offsetWidth, y: offsetHeight }
  });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};

window.addEventListener("load", init);
// window.addEventListener("resize", init);