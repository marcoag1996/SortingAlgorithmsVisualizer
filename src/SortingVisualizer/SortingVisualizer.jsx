import React from 'react';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

const NUMBER_OF_BARS = 350;

const ANIMATION_SPEED_MS = 1;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        
        this.setState({array}); 
        // return default color
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            const barStyle = arrayBars[i].style;
            barStyle.backgroundColor = "black";
        } 
    }

    mergeSort() {
        /*
        const javaScriptSortedArray = this.state.array
        .slice()
        .sort((a,b) => a - b );
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array);

        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
        */

        const animations = sortingAlgorithms.mergeSortAnimated(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else { // each two items comes one that overwrites the bar
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    insertionSort() {}
    quickSort() {}
    heapSort() {}
    bubbleSort() {
        /*
        const javaScriptSortedArray = this.state.array
        .slice()
        .sort((a,b) => a - b );
        const sortedArray = sortingAlgorithms.bubbleSort(this.state.array);
        console.log(sortedArray);
        console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
        */
        const animations = sortingAlgorithms.bubbleSortAnimated(this.state.array);
        //console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4 <= 1; 
            // console.log(i);
            // console.log(animations[i]);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoSyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? 'red' : 'turquoise';
                //console.log(color);
                setTimeout(() => { 
                    barOneStyle.backgroundColor = color;
                    barTwoSyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeightOne] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeightOne}px`;
                }, i * ANIMATION_SPEED_MS); 
            }

        }
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let j = 0; j < length; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a,b) => a - b);
            const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                    className="array-bar"
                    key={idx}
                    style={{
                        backgroundColor: 'black',
                        height: `${value}px`,
                    }}></div>
                ))}
                <div className="buttons">
                    <button onClick={() => this.resetArray()}>Generate new array</button>
                    <button onClick={() => this.mergeSort()}>Sort using MergeSort</button>
                    <button onClick={() => this.insertionSort()}>Sort using InsertionSort</button>
                    <button onClick={() => this.quickSort()}>Sort using quickSort</button>
                    <button onClick={() => this.heapSort()}>Sort using heapSort</button>
                    <button onClick={() => this.bubbleSort()}>Sort using bubbleSort</button>
                    <button onClick={() => this.testSortingAlgorithms()}>Test algorithms</button>
                </div>
            </div>
        );
    }
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}