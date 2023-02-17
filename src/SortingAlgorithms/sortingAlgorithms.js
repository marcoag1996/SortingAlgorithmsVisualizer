// ----------------------MERGE SORT-----------------------
export const mergeSort = array => {
    if (array.length === 1) return array;
    // divide array in to halves
    const middleIdx = Math.floor(array.length / 2);
    // divide each part until get 1 sized array
    const firstHalf = mergeSort(array.slice(0,middleIdx));
    const secondHalf = mergeSort(array.slice(middleIdx));
    /* const firstHalf = [];
    const secondHalf = [];
    for (let i = 0; i < middleIdx; i++) {
        firstHalf.push(array[i]);
    }
    for (let i = middleIdx; i < array.length; i++) {
        secondHalf.push(array[i]);
    }
    mergeSort(firstHalf);
    mergeSort(secondHalf);
    */
    // merge
    // const sortedArray = [];
    let i = 0, // iterator for left part
    j = 0, // iterator for right part
    k = 0; // iterator for final array
    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] < secondHalf[j]) {
            // sortedArray.push(firstHalf[i++]);
            array[k++] = firstHalf[i++];
        } else {
            // sortedArray.push(secondHalf[j++]);
            array[k++] = secondHalf[j++];
        }
    }
    // put the elements that last in each part if any.
    // while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    // while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    while (i < firstHalf.length) array[k++] = firstHalf[i++];
    while (j < secondHalf.length) array[k++] = secondHalf[j++];
    return array;
};

export function mergeSortAnimated(array) {
     const animations = [];
     if (array.length <= 1) return array;
     const auxArray = array.slice(); // create a copy of the array
     sort(array, auxArray, 0, array.length - 1, animations);
     return animations;
}

function sort(array, auxArray, startIndex, endIndex, animations) {
    if (startIndex === endIndex) return;
    const middleIdx = Math.floor(startIndex + (endIndex - startIndex) / 2);
    sort(auxArray, array, startIndex, middleIdx, animations);
    sort(auxArray, array, middleIdx + 1, endIndex, animations);
    merge(array, auxArray, startIndex, middleIdx, endIndex, animations);
}

function merge(array, auxArray, startIndex, middleIdx, endIndex, animations) {
    /* this is avoided by flipping array by auxArray in sort method
    for (let i = startIndex; i <= endIndex; i++) {
        auxArray[i] = array[i];
    }
    */
    let i = startIndex; // start of first half
    let j = middleIdx + 1; // start of second half
    let k = startIndex; // start of aux array
    while (i <= middleIdx && j <= endIndex) {
        // push them once to change color, we are comparing values
        animations.push([i,j]);
        // push them to revert color
        animations.push([i,j]);
        if (auxArray[i] < auxArray[j]) {
            // overwrite the values at k in the og array with the value at i of aux.
            animations.push([k, auxArray[i]]);
            array[k++] = auxArray[i++];
        } else {
            animations.push([k, auxArray[j]]);
            array[k++] = auxArray[j++];
        }
    }
    while (i <= middleIdx) {
        // push them once to change color, we are comparing values
        animations.push([i,i]);
        // push them to revert color
        animations.push([i,i]);
        animations.push([k, auxArray[i]]);
        array[k++] = auxArray[i++];
    }
    while (j <= endIndex) {
        // push them once to change color, we are comparing values
        animations.push([j,j]);
        // push them to revert color
        animations.push([j,j]);
        animations.push([k, auxArray[j]]);
        array[k++] = auxArray[j++];
    }
}

// ------------------BUBBLE SORT---------------------
export const bubbleSortAnimated = array => {
    const animations = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            animations.push([j,j+1]); // change color once, showing comparison
            animations.push([j,j+1]); // revert change of color
            if (array[j] > array[j + 1]) {
                // swap values
                let aux = array[j + 1];
                array[j + 1] = array[j];
                array[j] = aux;
            }
            animations.push([j, array[j]]); // overwrite the height of j
            animations.push([j+1, array[j+1]]); // overwrite the height of j+1 
        }
    }
    return animations;
}
