import TunerUtils from "./TunerUtils";


test('test configuration', () => {
    expect(TunerUtils).toBeDefined();
});



test('findXYValues', () => {
    let dataArray = TunerUtils.createSampleData();
    let xyValues = TunerUtils.findXyValues(dataArray);
    expect(xyValues).toHaveLength(128);

});