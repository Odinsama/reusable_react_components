//the last level in the hierarchy which contains the value we are looking for. in this case "size"
function generateLeaves(numberOfLeaves) {
    let leaves = []
    for (let y = 0; y<numberOfLeaves; y++){
        leaves[y] = {
            "name": "Leaf: " + y,
            "size": Math.floor(Math.random() * 5000)
        }
    }
    return leaves
}

function generateBranches(NumberOfBranches, parentLevel, categories) {
    let branches = []
    for (let i = 0; i < NumberOfBranches; i++) {
        branches[i] = {
            "name": "Branch: " + i,
            "children": (parentLevel < categories-1) ?
                //calls itself until there is just one more level that should be nested in the hierarchy
                generateBranches(Math.floor(Math.random() * 5) +1, parentLevel+1, categories) :
                generateLeaves(Math.floor(Math.random() * 3) +1)
        }
    }
    return branches
}

function generateTreeStructuredMockData(categories) {
    //generates a random floating-point between 0 and 1, multiplies it by 5 and adds 1.
    // This gives us a random number between 1 and 6, the range was chosen arbitrarily.
    const RandomNumberOfBranches = Math.floor(Math.random() * 5) +1;
    return {
        //the root itself is not a category, it is the aggregate of all the values in the hierarchy
        "name": "root",
        "children": generateBranches(RandomNumberOfBranches, 1, categories)
    }
}

export default generateTreeStructuredMockData;