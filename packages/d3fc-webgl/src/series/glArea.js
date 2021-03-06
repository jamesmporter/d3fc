import elementConstantAttributeBuilder from '../buffers/elementConstantAttributeBuilder';
import glScaleBase from '../scale/glScaleBase';
import programBuilder from '../program/programBuilder';
import drawModes from '../program/drawModes';
import areaShader from '../shaders/area/shader';
import { rebind } from '@d3fc/d3fc-rebind';
import vertexConstantAttributeBuilder from '../buffers/vertexConstantAttributeBuilder';

export default () => {
    let xScale = glScaleBase();
    let yScale = glScaleBase();
    let decorate = () => {};

    const xValueAttribute = elementConstantAttributeBuilder().value(
        (data, element) => data[Math.min(element + 1, data.length - 1)]
    );
    const xPreviousValueAttribute = elementConstantAttributeBuilder();
    const yValueAttribute = elementConstantAttributeBuilder().value(
        (data, element) => data[Math.min(element + 1, data.length - 1)]
    );
    const yPreviousValueAttribute = elementConstantAttributeBuilder();
    const y0ValueAttribute = elementConstantAttributeBuilder().value(
        (data, element) => data[Math.min(element + 1, data.length - 1)]
    );
    const y0PreviousValueAttribute = elementConstantAttributeBuilder();
    const cornerAttribute = vertexConstantAttributeBuilder()
        .size(3)
        .data([
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 1],
            [1, 0, 0],
            [1, 1, 0]
        ]);
    const definedAttribute = elementConstantAttributeBuilder().value(
        (data, element, vertex, component) => {
            const value = data[element];
            const nextValue =
                element === data.length - 1 ? 0 : data[element + 1];
            return value ? nextValue : value;
        }
    );

    const program = programBuilder()
        .mode(drawModes.TRIANGLES)
        .verticesPerElement(6);

    program
        .buffers()
        .attribute('aCrossValue', xValueAttribute)
        .attribute('aCrossPrevValue', xPreviousValueAttribute)
        .attribute('aMainValue', yValueAttribute)
        .attribute('aMainPrevValue', yPreviousValueAttribute)
        .attribute('aBaseValue', y0ValueAttribute)
        .attribute('aBasePrevValue', y0PreviousValueAttribute)
        .attribute('aCorner', cornerAttribute)
        .attribute('aDefined', definedAttribute);

    const draw = numElements => {
        const shaderBuilder = areaShader();
        program
            .vertexShader(shaderBuilder.vertex())
            .fragmentShader(shaderBuilder.fragment());

        xScale.coordinate(0);
        xScale(program);
        yScale.coordinate(1);
        yScale(program);

        decorate(program);

        program(numElements - 1);
    };

    draw.xValues = data => {
        xValueAttribute.data(data);
        xPreviousValueAttribute.data(data);
        return draw;
    };

    draw.yValues = data => {
        yValueAttribute.data(data);
        yPreviousValueAttribute.data(data);
        return draw;
    };

    draw.y0Values = data => {
        y0ValueAttribute.data(data);
        y0PreviousValueAttribute.data(data);
        return draw;
    };

    draw.defined = data => {
        definedAttribute.data(data);
        return draw;
    };

    draw.decorate = (...args) => {
        if (!args.length) {
            return decorate;
        }
        decorate = args[0];
        return draw;
    };

    draw.xScale = (...args) => {
        if (!args.length) {
            return xScale;
        }
        xScale = args[0];
        return draw;
    };

    draw.yScale = (...args) => {
        if (!args.length) {
            return yScale;
        }
        yScale = args[0];
        return draw;
    };

    rebind(draw, program, 'context');

    return draw;
};
