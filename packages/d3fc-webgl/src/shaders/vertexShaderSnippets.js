export const scale = {
    header: `uniform vec2 uScale;`,
    body: `gl_Position.xy = gl_Position.xy * uScale;`
};

export const translate = {
    header: `uniform vec2 uTranslate;`,
    body: `gl_Position.xy = gl_Position.xy + uTranslate;`
};

export const multiColor = {
    header: `attribute vec4 aColor;
             varying vec4 vColor;`,
    body: `vColor = aColor;`
};

export const circle = {
    header: `attribute float aCrossValue;
             attribute float aMainValue;
             attribute float aSize;
             uniform float uStrokeWidth;
             varying float vSize;`,
    body: `vSize = 2.0 * sqrt(aSize / 3.14159);
           gl_PointSize = vSize + uStrokeWidth + 1.0;
           gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`
};

export const square = {
    header: `attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        uniform float uStrokeWidth;
        varying float vSize;`,
    body: `vSize = sqrt(aSize);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`
};

export const triangle = {
    header: `attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        uniform float uStrokeWidth;
        varying float vSize;`,
    body: `vSize = sqrt((16.0 * aSize) / (3.0 * sqrt(3.0)));
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`
};

export const cross = {
    header: `attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aSize;
        uniform float uStrokeWidth;
        varying float vSize;
        varying float vStrokeWidthRatio;`,
    body: `vSize = 3.0 * sqrt(aSize / 5.0);
        vStrokeWidthRatio = uStrokeWidth / (vSize + uStrokeWidth + 1.0);
        gl_PointSize = vSize + uStrokeWidth + 1.0;
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);`
};

export const candlestick = {
    header: `
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aHighValue;
        attribute float aOpenValue;
        attribute float aCloseValue;
        attribute float aLowValue;
        attribute vec3 aCorner;
    
        varying float vColorIndicator;
        uniform vec2 uScreen;
        uniform float uStrokeWidth;`,
    body: `
        vColorIndicator = sign(aCloseValue - aOpenValue);

        float isPositiveY = (sign(aCorner.y) + 1.0) / 2.0;
        float isNotPositiveY = 1.0 - isPositiveY;
        float isExtremeY = abs(aCorner.y) - 1.0;
        float isNotExtremeY = 1.0 - isExtremeY;
        float yValue =
         (isPositiveY * isExtremeY * aLowValue) + 
         (isPositiveY * isNotExtremeY * aCloseValue) +
         (isNotPositiveY * isNotExtremeY * aOpenValue) +
         (isNotPositiveY * isExtremeY * aHighValue);

        float lineWidthXDirection = (isNotExtremeY * aCorner.x) + (isExtremeY * aCorner.z);
        float lineWidthYDirection = isNotExtremeY * sign(aCloseValue - aOpenValue) * aCorner.y;

        float bandwidthModifier = aBandwidth * aCorner.x / 2.0;

        float xModifier = (uStrokeWidth * lineWidthXDirection / 2.0) + bandwidthModifier;
        float yModifier = uStrokeWidth * lineWidthYDirection / 2.0;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);`
};

export const ohlc = {
    header: `
      attribute float aCrossValue;
      attribute float aBandwidth;
      attribute float aHighValue;
      attribute float aOpenValue;
      attribute float aCloseValue;
      attribute float aLowValue;
      attribute vec3 aCorner;

      varying float vColorIndicator;
      uniform vec2 uScreen;
      uniform float uStrokeWidth;`,
    body: `
      vColorIndicator = sign(aCloseValue - aOpenValue);

      float isPositiveY = (sign(aCorner.y) + 1.0) / 2.0;
      float isNotPositiveY = 1.0 - isPositiveY;
      float isExtremeY = abs(aCorner.y) - 1.0;
      float isNotExtremeY = 1.0 - isExtremeY;
      float yValue = 
        (isPositiveY * isExtremeY * aLowValue) + 
        (isPositiveY * isNotExtremeY * aCloseValue) +
        (isNotPositiveY * isNotExtremeY * aOpenValue) +
        (isNotPositiveY * isExtremeY * aHighValue);

      float lineWidthXDirection = isExtremeY * aCorner.z;
      float lineWidthYDirection = isNotExtremeY * aCorner.z;

      float bandwidthModifier = isNotExtremeY * aCorner.x * aBandwidth / 2.0;

      float xModifier = (uStrokeWidth * lineWidthXDirection / 2.0) + bandwidthModifier;
      float yModifier = uStrokeWidth * lineWidthYDirection / 2.0;

      gl_Position = vec4(aCrossValue, yValue, 0, 1);`
};

export const bar = {
    header: `
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aMainValue;
        attribute float aBaseValue;
        attribute vec2 aCorner;
        
        uniform vec2 uScreen;
        uniform float uStrokeWidth;`,
    body: `
        float isBaseline = (1.0 - aCorner.y) / 2.0;
        float yValue = (isBaseline * aBaseValue) + ((1.0 - isBaseline) * aMainValue);

        float xModifier = aCorner.x * (aBandwidth) / 2.0;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);
        `
};

export const preScaleLine = {
    header: `
        attribute vec3 aCorner;
        attribute float aCrossNextValue;
        attribute float aMainNextValue;
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aCrossPrevValue;
        attribute float aMainPrevValue;
        attribute float aCrossPrevPrevValue;
        attribute float aMainPrevPrevValue;
        attribute float aDefined;
        
        uniform float uStrokeWidth;
        uniform vec2 uScreen;

        varying float vDefined;`,
    body: `vDefined = aDefined;
        vec4 next = vec4(aCrossNextValue, aMainNextValue, 0, 0);
        gl_Position = vec4(aCrossValue, aMainValue, 0, 1);
        vec4 prev = vec4(aCrossPrevValue, aMainPrevValue, 0, 0);
        vec4 prevPrev = vec4(aCrossPrevPrevValue, aMainPrevPrevValue, 0, 0);`
};

export const postScaleLine = {
    body: `vec4 prevVertexPosition = gl_Position;
        vec4 currVertexPosition = gl_Position;
        
        if (all(equal(prev.xy, prevPrev.xy))) {
            prevPrev.xy = prev.xy + normalize(prev.xy - prevVertexPosition.xy);
        }
        if (all(equal(prev.xy, prevVertexPosition.xy))) {
            prevVertexPosition.xy = prev.xy + normalize(prev.xy - prevPrev.xy);
        }
        vec2 A = normalize(normalize(prev.xy - prevPrev.xy) * uScreen);
        vec2 B = normalize(normalize(prevVertexPosition.xy - prev.xy) * uScreen);
        vec2 tangent = normalize(A + B);
        vec2 miter = vec2(-tangent.y, tangent.x);
        vec2 normalA = vec2(-A.y, A.x);
        float miterLength = 1.0 / dot(miter, normalA);
        vec2 point = normalize(A - B);
        if (miterLength > 10.0 && sign(aCorner.x * dot(miter, point)) > 0.0) {
            prevVertexPosition.xy = prev.xy - (aCorner.x * aCorner.y * uStrokeWidth * normalA) / uScreen.xy;
        } else {
            prevVertexPosition.xy = prev.xy + (aCorner.x * miter * uStrokeWidth * miterLength) / uScreen.xy;
        }

        if (all(equal(currVertexPosition.xy, prev.xy))) {
            prev.xy = currVertexPosition.xy + normalize(currVertexPosition.xy - next.xy);
        }
        if (all(equal(currVertexPosition.xy, next.xy))) {
            next.xy = currVertexPosition.xy + normalize(currVertexPosition.xy - prev.xy);
        }
        vec2 C = normalize(normalize(currVertexPosition.xy - prev.xy) * uScreen);
        vec2 D = normalize(normalize(next.xy - currVertexPosition.xy) * uScreen);
        vec2 tangentCD = normalize(C + D);
        vec2 miterCD = vec2(-tangentCD.y, tangentCD.x);
        vec2 normalC = vec2(-C.y, C.x);
        float miterCDLength = 1.0 / dot(miterCD, normalC);
        vec2 pointCD = normalize(C - D);
        if (miterCDLength > 10.0 && sign(aCorner.x * dot(miterCD, pointCD)) > 0.0) {
            currVertexPosition.xy = currVertexPosition.xy - (aCorner.x * aCorner.y * uStrokeWidth * normalC) / uScreen.xy;
        } else {
            currVertexPosition.xy = currVertexPosition.xy + (aCorner.x * miterCD * uStrokeWidth * miterCDLength) / uScreen.xy;
        }
        
        gl_Position.xy = ((1.0 - aCorner.z) * prevVertexPosition.xy) + (aCorner.z * currVertexPosition.xy);`
};

export const errorBar = {
    header: `
        attribute vec3 aCorner;
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aHighValue;
        attribute float aLowValue;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;`,
    body: `
        float isLow = (aCorner.y + 1.0) / 2.0;
        float yValue = isLow * aLowValue + (1.0 - isLow) * aHighValue;

        float isEdgeCorner = abs(aCorner.x);
        float lineWidthXDirection = (1.0 - isEdgeCorner) * aCorner.z;
        float lineWidthYDirection = isEdgeCorner * aCorner.z;
        
        gl_Position = vec4(aCrossValue, yValue, 0, 1);
        
        float xModifier = (uStrokeWidth * lineWidthXDirection) + (aBandwidth * aCorner.x / 2.0);
        float yModifier = (uStrokeWidth * lineWidthYDirection);
    `
};

export const area = {
    header: `
        attribute vec3 aCorner;
        attribute float aCrossValue;
        attribute float aMainValue;
        attribute float aCrossPrevValue;
        attribute float aMainPrevValue;
        attribute float aBaseValue;
        attribute float aBasePrevValue;
        attribute float aDefined;

        varying float vDefined;
        
        float when_lt(float a, float b) {
            return max(sign(b - a), 0.0);
        }
        
        float and(float a, float b) {
            return a * b;
        }`,
    body: `vDefined = aDefined;
        gl_Position = vec4(0, 0, 0, 1);

        float hasIntercepted = when_lt((aMainValue - aBaseValue) * (aMainPrevValue - aBasePrevValue), 0.0);
        float useIntercept = and(aCorner.z, hasIntercepted);
        
        float yGradient = (aMainValue - aMainPrevValue) / (aCrossValue - aCrossPrevValue);
        float yConstant = aMainValue - (yGradient * aCrossValue);

        float y0Gradient = (aBaseValue - aBasePrevValue) / (aCrossValue - aCrossPrevValue);
        float y0Constant = aBaseValue - (y0Gradient * aCrossValue);

        float denominator = (yGradient - y0Gradient) + step(abs(yGradient - y0Gradient), 0.0);
        float interceptXValue = (y0Constant - yConstant) / denominator;
        float interceptYValue = (yGradient * interceptXValue) + yConstant;

        gl_Position = vec4(interceptXValue * useIntercept, interceptYValue * useIntercept, 0, 1);
        
        gl_Position.x += (1.0 - useIntercept) * ((aCorner.x * aCrossValue) + ((1.0 - aCorner.x) * aCrossPrevValue));
        gl_Position.y += (1.0 - useIntercept) * (1.0 - aCorner.y) * ((aCorner.x * aMainValue) + ((1.0 - aCorner.x) * aMainPrevValue));
        gl_Position.y += (1.0 - useIntercept) * aCorner.y * ((aCorner.x * aBaseValue) + ((1.0 - aCorner.x) * aBasePrevValue));`
};

export const boxPlot = {
    header: `
        attribute vec4 aCorner;
        attribute float aCrossValue;
        attribute float aBandwidth;
        attribute float aCap;
        attribute float aHighValue;
        attribute float aUpperQuartileValue;
        attribute float aMedianValue;
        attribute float aLowerQuartileValue;
        attribute float aLowValue;

        uniform vec2 uScreen;
        uniform float uStrokeWidth;`,
    body: `   
        float isExtremeY = sign(abs(aCorner.y) - 2.0) + 1.0;
        float isNotExtremeY = 1.0 - isExtremeY;

        float isNonZeroY = abs(sign(aCorner.y));
        float isZeroY = 1.0 - isNonZeroY;

        float isQuartileY = isNotExtremeY * isNonZeroY;

        float isPositiveY = (sign(aCorner.y + 0.5) + 1.0) / 2.0;
        float isNegativeY = 1.0 - isPositiveY;

        float yValue =
          (isExtremeY * isNegativeY) * aHighValue +
          (isQuartileY * isNegativeY) * aUpperQuartileValue +
          isZeroY * aMedianValue +
          (isQuartileY * isPositiveY) * aLowerQuartileValue +
          (isExtremeY * isPositiveY) * aLowValue;

        gl_Position = vec4(aCrossValue, yValue, 0, 1);

        float isHorizontal = aCorner.w;
        float isVertical = 1.0 - isHorizontal;

        float xDisplacement = aCorner.x * (isExtremeY * aCap + isNotExtremeY * aBandwidth) / 2.0;
        
        float xModifier = (isVertical * uStrokeWidth * aCorner.z / 2.0) + xDisplacement;
        float yModifier = isHorizontal * uStrokeWidth * aCorner.z / 2.0;
        `
};
