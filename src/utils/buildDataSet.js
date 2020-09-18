export default function buildDataSet(labels, datasets) {

    return {
        labels,
        datasets: datasets.map(elem => {
            return {
                label: elem.label,
                data: [...elem.data],
                backgroundColor: elem.backgroundColor,
                borderColor: elem.borderColor
            }
        })
    }
}