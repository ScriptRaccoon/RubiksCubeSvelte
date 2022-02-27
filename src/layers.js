export const faceNames = [
    "front",
    "back",
    "top",
    "down",
    "left",
    "right",
];

export const layerMap = {
    front: { axis: "z", value: 1 },
    back: { axis: "z", value: -1 },
    top: { axis: "y", value: -1 },
    down: { axis: "y", value: +1 },
    left: { axis: "x", value: -1 },
    right: { axis: "x", value: +1 },
    equator: { axis: "y", value: 0 },
    middle: { axis: "x", value: 0 },
    standing: { axis: "z", value: 0 },
};
