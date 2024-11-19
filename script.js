// * Script Water Canvas
    // const canvas = document.getElementById('waterCanvas');
    // const ctx = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // const waves = [];
    // const waveCount = 25;

    // for (let i = 0; i < waveCount; i++) {
    //     waves.push({
    //         y: (canvas.height / 2) - 100 + Math.random() * 200,
    //         length: 0.01 + Math.random() * 0.001,
    //         amplitude: 50 + Math.random() * 100,
    //         frequency: 0.01 + Math.random() * 0.03,
    //         phase: Math.random() * Math.PI * 2
    //     });
    // }

    // function animate() {
    //     requestAnimationFrame(animate);
    //     ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     waves.forEach((wave, index) => {
    //         ctx.beginPath();
    //         ctx.moveTo(0, wave.y);
    //         for (let i = 0; i < canvas.width; i++) {
    //             const yOffset = Math.sin(i * wave.length + wave.phase) * wave.amplitude * Math.sin(wave.phase);
    //             ctx.lineTo(i, wave.y + yOffset);
    //         }
    //         ctx.strokeStyle = `hsl(${index / 2 + 170}, 100%, 50%)`;
    //         ctx.stroke();
    //         wave.phase += wave.frequency;
    //     });
    // }

    // animate();

    // window.addEventListener('resize', () => {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     waves.forEach((wave) => {
    //         wave.y = (canvas.height / 2) - 100 + Math.random() * 200;
    //     });
    // });

// * Script Embers Canvas

const canvas = document.getElementById('embersCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const embers = [];
    const emberCount = 200;

    // Ember particle settings
    const emberSettings = {
        maxSize: 4,
        minSize: 1,
        maxSpeed: 7,
        minSpeed: 0.5,
        color: 'rgba(131, 21, 29)', // Orange-red color with transparency
    };

    // Adjust canvas size on resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Ember particle class
    class Ember {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = emberSettings.minSize + Math.random() * (emberSettings.maxSize - emberSettings.minSize);
            this.speed = emberSettings.minSpeed + Math.random() * (emberSettings.maxSpeed - emberSettings.minSpeed);
            this.opacity = 1;
            this.fadeRate = Math.random() * 0.02 + 0.005;
            this.color = emberSettings.color;
        }

        update() {
            this.y -= this.speed;
            this.opacity -= this.fadeRate;
            if (this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('0.7', this.opacity.toFixed(2)); // Adjust opacity
            ctx.fill();
        }
    }

    // Create initial embers
    for (let i = 0; i < emberCount; i++) {
        embers.push(new Ember());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        embers.forEach(ember => {
            ember.update();
            ember.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    