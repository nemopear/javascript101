$(window).load(function () {
    childEqualHeight('.rainMakerItem', '.productTitle');
    childEqualHeight('.rainMakerItem', '.productFeatureList');
    childEqualHeight('.rainMakerItem', '.productSeeMore');
});

$(window).resize(function () {
    childEqualHeight('.rainMakerItem', '.productTitle');
    childEqualHeight('.rainMakerItem', '.productFeatureList');
    childEqualHeight('.rainMakerItem', '.productSeeMore');
});