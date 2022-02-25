export const cubieTransform = {};

// front and back and standing layer

cubieTransform.front =
    cubieTransform.back =
    cubieTransform.standing =
        {
            "+": function (cubie) {
                return {
                    id: cubie.id,
                    type: cubie.type,
                    coords: {
                        x: -cubie.coords.y,
                        y: cubie.coords.x,
                        z: cubie.coords.z,
                    },
                    colors: {
                        back: cubie.colors.back,
                        front: cubie.colors.front,
                        top: cubie.colors.left,
                        down: cubie.colors.right,
                        left: cubie.colors.down,
                        right: cubie.colors.top,
                    },
                };
            },
            "-": function (cubie) {
                return {
                    id: cubie.id,
                    type: cubie.type,
                    coords: {
                        x: cubie.coords.y,
                        y: -cubie.coords.x,
                        z: cubie.coords.z,
                    },
                    colors: {
                        back: cubie.colors.back,
                        front: cubie.colors.front,
                        top: cubie.colors.right,
                        down: cubie.colors.left,
                        left: cubie.colors.top,
                        right: cubie.colors.down,
                    },
                };
            },
        };

// top and down and equator layer

cubieTransform.top =
    cubieTransform.down =
    cubieTransform.equator =
        {
            "+": function (cubie) {
                return {
                    id: cubie.id,
                    type: cubie.type,
                    coords: {
                        x: cubie.coords.z,
                        y: cubie.coords.y,
                        z: -cubie.coords.x,
                    },
                    colors: {
                        back: cubie.colors.right,
                        front: cubie.colors.left,
                        top: cubie.colors.top,
                        down: cubie.colors.down,
                        left: cubie.colors.back,
                        right: cubie.colors.front,
                    },
                };
            },
            "-": function (cubie) {
                return {
                    id: cubie.id,
                    type: cubie.type,
                    coords: {
                        x: -cubie.coords.z,
                        y: cubie.coords.y,
                        z: cubie.coords.x,
                    },
                    colors: {
                        back: cubie.colors.left,
                        front: cubie.colors.right,
                        top: cubie.colors.top,
                        down: cubie.colors.down,
                        left: cubie.colors.front,
                        right: cubie.colors.back,
                    },
                };
            },
        };

// left and right and middle layer

cubieTransform.left =
    cubieTransform.right =
    cubieTransform.middle =
        {
            "+": function (cubie) {
                return {
                    id: cubie.id,
                    type: cubie.type,
                    coords: {
                        x: cubie.coords.x,
                        y: -cubie.coords.z,
                        z: cubie.coords.y,
                    },
                    colors: {
                        back: cubie.colors.top,
                        front: cubie.colors.down,
                        top: cubie.colors.front,
                        down: cubie.colors.back,
                        left: cubie.colors.left,
                        right: cubie.colors.right,
                    },
                };
            },
            "-": function (cubie) {
                return {
                    id: cubie.id,
                    type: cubie.type,
                    coords: {
                        x: cubie.coords.x,
                        y: cubie.coords.z,
                        z: -cubie.coords.y,
                    },
                    colors: {
                        back: cubie.colors.down,
                        front: cubie.colors.top,
                        top: cubie.colors.back,
                        down: cubie.colors.front,
                        left: cubie.colors.left,
                        right: cubie.colors.right,
                    },
                };
            },
        };
