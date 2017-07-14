let backup = '';

export function storeOriginal(items) {
    backup = items;
}

export function extractUnique(items) {
    return '-->' + items;
}

export function collapse(itemsArr) {
    console.log('itemsArr', itemsArr);

    itemsArr.forEach(function(singleCollection, index) {
        let itemsInCollection = singleCollection['items'];
        let margins = singleCollection['margins'].split('-');
        let start = margins[0] | 0;
        let end = margins[margins.length - 1] | 0;
        let all = [], having = [], missing = [], merged = [];

        if (start && end) {
            for (let i = start; i < end; i++) {
                all.push(i + '');
            }

            itemsInCollection.split(',').forEach((element) => {
                if (element.indexOf('-') === -1) {
                    let n = element.split(/\D+/g)[0];
                    having.push(n);
                } else {
                    let n = element.split('-');
                    let i = n[0] | 0;
                    let j = n[n.length - 1] | 0;

                    for (let k = i; k < j; k++) {
                        having.push(k + '');
                    }

                    having.push(j + '');
                }
            });

            missing = all.filter(element => having.indexOf(element) === -1);
        }
console.log('missing', missing);

        // return { items: items, having: having, missing: missing };
    }, this);

    return itemsArr;
}
export function expand(items) {
    console.log('expand', items);

    return items;
}
export function missing(items) {
    console.log('missing', items);

    return items;
}
