import uniq from 'lodash/uniq'
import cloneDeep from 'lodash/cloneDeep'

export function distinct(array, property) {
    return uniq(array.map(d => d[property]))
}

export function groups(array = [], groupBy = 'group', fn) {
    const distinctValues = distinct(array, groupBy)
    return distinctValues.map(v => {
        const group = array.filter(i => i[groupBy] == v)
        return fn ? fn(group) : group
    })
}

export function getBandwidth(ticks, distance) {

    if (ticks) return distance / ticks.length

    return 0
}

export function getTicks(scale) {
    if (scale.ticks) {
        return scale.ticks()
    }

    if (scale.domain) {
        return scale.domain()
    }
}

export function toStacked(array, property = 'name') {
    let stacked = array.map(i => Object.assign({}, i))
    let map = {}
    array.forEach((item, i) => {
        let key = item[property]
        stacked[i].y0 = map[key] ? map[key] : 0 // 1st
        map[key] = map[key] ? map[key] + item.value : item.value // 2nd
        stacked[i].y1 = map[key] // 3rd
    })
    return stacked
}

export function id(): string {
    const cache = {};
    let newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  
    // append a 'a' because neo gets mad
    newId = `a${newId}`;
  
    // ensure not already used
    if(!cache[newId]) {
      cache[newId] = true;
      return newId;
    }
  
    return id();
  }

export function getMaxGroup(groupData){
    let maxLength = groupData[0].length
    let maxGroup = groupData[0]
    groupData.forEach(group => {
        if(group.length > maxLength)
            maxGroup = group
    });

    return maxGroup
}

export function getMapData(data, dataMapper) {
    let mapData = cloneDeep(data)
    if (dataMapper) {
        let mappers = [
            dataMapper,
            (d, i) => Object.assign({ order: i }, d)
        ]
        mappers.forEach(map => {
            if (map) mapData = mapData.map(map)
        })
    }
    else{
        let mappers = [
            (d, i) => Object.assign({ order: i }, d)
        ]
        mappers.forEach(map => {
            if (map) mapData = mapData.map(map)
        })
    }
    return mapData
}

export function isNumberOrNumberString(value) {
    switch (value) {
        case '': return false;
        case null: return false;
        case undefined: return false;
        default: return isFinite(value)
    }
}