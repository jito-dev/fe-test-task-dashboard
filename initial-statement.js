export const activityInformation = {
    texts: 21,
    mails: 4,
    calls: 3,
    callTime: '1:48'
}

export const state = {
    'Iron': false,
    'Stove': false,
    'Fridge': false,
    'TV living Room': false,
    'TV bedroom': false,
    'Front door': false,
    'Back door': false
}

export const rooms = {
    'Kitchen': ['Dining room'],
    'Dining room': ['Kitchen', 'Bedroom', 'Living room'],
    'Bedroom': ['Dining room', 'Living room'],
    'Living room': ['Dining room', 'Bedroom'],
}