const parseTimestamp = (t) => {
    let groups = t.match(/\[\d+\-\d+\-\d+\s\d+:(\d+)\]\s([A-Z]+)\s#*(\d*)/i);
   
    return {
        action: groups[2].toLowerCase(),
        minute: parseInt(groups[1]),
        id: groups[3]        
    }
};

module.exports = parseTimestamp;