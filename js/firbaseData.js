const firebaseData = (data) => {
    const tab = []
    data.forEach(doc => {
        tab.push(doc.data());
    });
    return tab
}

export {firebaseData}
