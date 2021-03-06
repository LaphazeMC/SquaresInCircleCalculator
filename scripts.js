var gui = new dat.GUI({ name: 'Settings', width: 300 });
        var squareFaceLength = gui.add({ squareFaceLength: 30 }, 'squareFaceLength', 2, 500, 1).onChange(function (newValue) {
            draw(squareFaceLength.object.squareFaceLength, circleRadius.object.circleRadius);
        });
        var circleRadius = gui.add({ circleRadius: 320}, 'circleRadius', 10, 2000, 1).onChange(function (newValue) {
            draw(squareFaceLength.object.squareFaceLength, circleRadius.object.circleRadius);
        });

        function draw(squareFaceLength, circleRadius) {
            var cv = document.getElementById('cv');
            var ct = cv.getContext('2d');
            var squareFaceLength = squareFaceLength;
            const circle = new Path2D();
            var circleRadius = circleRadius;
            ct.clearRect(0, 0, w, h);
            var rectCount = 0;
            var listExistingSquares = [];
            ct.beginPath();
            cv.width = circleRadius * 2;
            cv.height = circleRadius * 2;
            var w = cv.width;
            var h = cv.height;
            var squareFaceLengthMid = squareFaceLength / 2;
            var circleCenter = circleRadius - squareFaceLengthMid;

            ct.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ct.fillRect(0, 0, w, h);

            ct.fillStyle = 'rgba(0, 0, 255, 0.5)';
            circle.arc(circleRadius, circleRadius, circleRadius, circleRadius / 2, 0, 2 * Math.PI, 0);
            ct.fill(circle);
            for (let i = 0; i < circleRadius / 4; i++) {
                for (let j = 0; j < circleRadius / 4; j++) {
                    ct.lineWidth = 1;
                    ct.strokeStyle = "red";
                    let rightBottomQuarter = { x: circleCenter + i * squareFaceLength, y: circleCenter + j * squareFaceLength };
                    let leftBottomQuarter = { x: circleCenter - i * squareFaceLength, y: circleCenter + j * squareFaceLength };
                    let rightTopQuarter = { x: circleCenter + i * squareFaceLength, y: circleCenter - j * squareFaceLength };
                    let leftTopQuarter = { x: circleCenter - i * squareFaceLength, y: circleCenter - j * squareFaceLength };

                    let rightBottomQuarterMid = { x: rightBottomQuarter.x + squareFaceLengthMid, y: rightBottomQuarter.y + squareFaceLengthMid };
                    if (ct.isPointInPath(circle, rightBottomQuarterMid.x, rightBottomQuarterMid.y, "evenodd")) {
                        if (!listExistingSquares.some(e => e.x == rightBottomQuarterMid.x && e.y == rightBottomQuarterMid.y)) {
                            ct.rect(rightBottomQuarter.x, rightBottomQuarter.y, squareFaceLength, squareFaceLength);
                            ct.fillRect(rightBottomQuarterMid.x, rightBottomQuarterMid.y, 1, 1);
                            listExistingSquares.push({ x: rightBottomQuarterMid.x, y: rightBottomQuarterMid.y });
                        }
                        rectCount = rectCount + 1;
                    }

                    let leftBottomQuarterMid = { x: leftBottomQuarter.x + squareFaceLengthMid, y: leftBottomQuarter.y + squareFaceLengthMid };
                    if (ct.isPointInPath(circle, leftBottomQuarterMid.x, leftBottomQuarterMid.y, "evenodd")) {
                        if (!listExistingSquares.some(e => e.x == leftBottomQuarterMid.x && e.y == leftBottomQuarterMid.y)) {
                            ct.rect(leftBottomQuarter.x, leftBottomQuarter.y, squareFaceLength, squareFaceLength);
                            ct.fillRect(leftBottomQuarterMid.x, leftBottomQuarterMid.y, 1, 1);
                            listExistingSquares.push({ x: leftBottomQuarterMid.x, y: leftBottomQuarterMid.y });
                        }
                        rectCount = rectCount + 1;
                    }

                    let rightTopQuarterMid = { x: rightTopQuarter.x + squareFaceLengthMid, y: rightTopQuarter.y + squareFaceLengthMid };
                    if (ct.isPointInPath(circle, rightTopQuarterMid.x, rightTopQuarterMid.y, "evenodd")) {
                        if (!listExistingSquares.some(e => e.x == rightTopQuarterMid.x && e.y == rightTopQuarterMid.y)) {
                            ct.rect(rightTopQuarter.x, rightTopQuarter.y, squareFaceLength, squareFaceLength);
                            ct.fillRect(rightTopQuarterMid.x, rightTopQuarterMid.y, 1, 1);
                            listExistingSquares.push({ x: rightTopQuarterMid.x, y: rightTopQuarterMid.y });
                        }
                        rectCount = rectCount + 1;
                    }

                    let leftTopQuarterMid = { x: leftTopQuarter.x + squareFaceLengthMid, y: leftTopQuarter.y + squareFaceLengthMid };
                    if (ct.isPointInPath(circle, leftTopQuarterMid.x, leftTopQuarterMid.y, "evenodd")) {
                        if (!listExistingSquares.some(e => e.x == leftTopQuarterMid.x && e.y == leftTopQuarterMid.y)) {
                            ct.rect(leftTopQuarter.x, leftTopQuarter.y, squareFaceLength, squareFaceLength);
                            ct.fillRect(leftTopQuarterMid.x, leftTopQuarterMid.y, 1, 1);
                            rectCount = rectCount + 1;
                            listExistingSquares.push({ x: leftTopQuarterMid.x, y: leftTopQuarterMid.y });
                        }
                        rectCount = rectCount + 1;
                    }
                }
            }
            ct.stroke();
            document.getElementById("resultNumber").innerText = rectCount;
        }

        function getCursorPosition(canvas, event) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            console.log("x: " + x + " y: " + y)
        }

        const canvas = document.querySelector('canvas')
        canvas.addEventListener('mousedown', function (e) {
            getCursorPosition(canvas, e)
        })

        draw(squareFaceLength.object.squareFaceLength, circleRadius.object.circleRadius);