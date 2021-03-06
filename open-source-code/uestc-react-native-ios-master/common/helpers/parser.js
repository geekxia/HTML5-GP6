import React from 'react';
import { View, Text } from 'react-native';
import _ from 'underscore';

export default handleParseData = (data) => {
  let arr = [
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
  ];
  let color = [
    '#E1A679',
    '#954A45',
    '#F596AA',
    '#B19693',
    '#877F6C',
    '#00AA90',
    '#7B90D2',
    '#F8C3CD',
    '#FFB11B',
    '#808F7C',
    '#B481BB',
    '#563F2E',
    '#535953',
    '#86C166',
    '#E1A679',
    '#954A45',
    '#F596AA',
    '#B19693',
    '#877F6C',
    '#00AA90',
    '#7B90D2',
    '#F8C3CD',
    '#FFB11B',
    '#808F7C',
    '#B481BB',
    '#563F2E',
    '#535953',
    '#86C166',
  ];
  let colorArray = [];
  for (let i=0; i<14; i++) {
    colorArray.push(color.slice(i, i+14));
  }

  data.forEach(ele => {
    if (ele.time.length === 4) {
      arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
        color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
        time: ele.time,
      };
      arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = {
        first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
        second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
        third: ele.room,
        fourth: `[${ele.date[0]}]`,
        color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
        justifyContent: 'flex-end',
        fontWeight: 'bold',
        fontSize: 10,
        time: ele.time,
      };
      arr[Number(ele.time[2][1])][Number(ele.time[2][0])][0] = {
        color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
        time: ele.time,
      };
      arr[Number(ele.time[3][1])][Number(ele.time[3][0])][0] = {
        color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
        time: ele.time,
      };
    }
  });

  // 3 ???????????????????????????????????? 4 ????????????????????????
  data.forEach(ele => {
    if(ele.time.length === 3) {
      const rows = [arr[Number(ele.time[0][1])][Number(ele.time[0][0])], arr[Number(ele.time[1][1])][Number(ele.time[1][0])], arr[Number(ele.time[2][1])][Number(ele.time[2][0])]];
      if (rows[0].length === 0 && rows[1].length === 0 && rows[2].length === 0) {
        // 3 ??????????????? 4 ?????????????????????????????????
        arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
          color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
          time: ele.time,
        };
        arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = {
          first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
          second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
          third: ele.room,
          fourth: `[${ele.date[0]}]`,
          color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: 10,
          time: ele.time,
        };
        arr[Number(ele.time[2][1])][Number(ele.time[2][0])][0] = {
          color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
          time: ele.time,
        };
      } else {
        // 3 ????????? 3 ??????????????????
        if (rows[0][0].time.length === 3 && rows[1][0].time.length === 3 && rows[2][0].time.length === 3) {
          arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
            first: rows[1][0].first,
            second: rows[1][0].second,
            third: rows[1][0].third,
            color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
            justifyContent: 'flex-end',
            fontWeight: 'normal',
            fontSize: 10,
            time: ele.time,
          };
          arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = {
            first: rows[1][0].fourth,
            second: `??? ${rows[1][0].time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
            third: ele.teacher,
            fourth: ele.courseName,
            color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
            justifyContent: 'space-around',
            fontWeight: 'normal',
            fontSize: 10,
            time: ele.time,
          };

          arr[Number(ele.time[2][1])][Number(ele.time[2][0])][0] = {
            first: ele.room,
            second: `[${ele.date[0]}]`,
            third: `??? ${ele.time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
            color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
            justifyContent: 'flex-start',
            fontWeight: 'normal',
            fontSize: 10,
            time: ele.time,
          }
        } else {
          // 3 ?????????????????? 4 ??????????????????????????????
          rows.forEach((row, index) => {
            /**
             * ?????? 4 ?????????????????????????????????????????????
             * ??????????????????????????????????????????????????? 3 ????????????????????????????????? 4 ????????????????????????????????????????????????????????????
             **/
            if (row.length !== 0 && row[0].fontSize === 10 && row[0].time.length === 4) {
              // ?????? 3 ??????????????? ???????????? 4 ?????????????????????????????????
              const time = _.union(row[0].time, ele.time);
              let hash = {};
              let unionTime = [];
              for(let i = 0, len = time.length; i < len; i++){
                if(!hash[time[i]]){
                  unionTime.push(time[i]);
                  hash[time[i]] = true;
                }
              }
              const theOtherCourseData = row[0];
              // ?????????????????????????????????
              unionTime.forEach(time => {
                arr[Number(time[1])][Number(time[0])][0] = {
                  color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
                  time: unionTime,
                };
              });

              // ???????????????????????????
              const position1 = Math.floor(unionTime.length / 2) - 1;
              const position2 = position1 + 1;

              arr[position2][Number(unionTime[0][0])][0] = Object.assign(arr[position2][Number(unionTime[0][0])][0], {
                first: theOtherCourseData.first,
                second: theOtherCourseData.second,
                third: theOtherCourseData.third,
                fourth: theOtherCourseData.fourth,
                fifth: `??? ${theOtherCourseData.time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
                justifyContent: 'center',
                color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
                fontWeight: 'bold',
                fontSize: 10,
              });

              arr[position1][Number(unionTime[0][0])][0] = Object.assign(arr[position1][Number(unionTime[0][0])][0], {
                first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
                second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
                third: ele.room,
                fourth: `[${ele.date[0]}]`,
                fifth: `??? ${ele.time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
                justifyContent: 'center',
                color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
                fontWeight: 'bold',
                fontSize: 10,
              });
            } else if (index === 2) {
              // ???????????????????????????????????????????????????????????? 4 ??????????????????????????????
              // ??????????????????????????????
              // A
              // A * 4 ????????????????????????
              // A B
              // A B
              // B * ????????????????????????

              // ??????
              // A
              // A * 4 ????????????????????????
              // A
              // A B
              // B
              // B * ????????????????????????

              // ????????????????????? B ?????? A ??????, ???????????????????????????
              arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = {
                first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
                second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
                third: ele.room,
                fourth: `[${ele.date[0]}]`,
                fifth: `??? ${ele.time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
                color: colorArray[Number(ele.time[0][1]) - 2][Number(ele.time[0][0])],
                justifyContent: 'space-around',
                fontWeight: 'normal',
                fontSize: 10,
                time: ele.time,
              };
              arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = { color: colorArray[Number(ele.time[0][1]) - 2][Number(ele.time[0][0])], time: ele.time,};
              arr[Number(ele.time[2][1])][Number(ele.time[2][0])][0] = { color: colorArray[Number(ele.time[0][1]) - 2][Number(ele.time[0][0])], time: ele.time,};
            }
          })
        }
      }
    }
  });

  // 2 ??????????????????
  data.forEach(ele => {
    if (ele.time.length === 2) {
      const rows = [arr[Number(ele.time[0][1])][Number(ele.time[0][0])], arr[Number(ele.time[1][1])][Number(ele.time[1][0])]];
      if (rows[0].length === 0 && rows[1].length === 0) {
        arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
          first: ele.teacher,
          second: ele.courseName,
          color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
          justifyContent: 'flex-end',
          fontWeight: 'bold',
          fontSize: 10,
          time: ele.time,
        };
        arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = {
          first: ele.room,
          second: `[${ele.date[0]}]`,
          color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
          justifyContent: 'flex-start',
          fontWeight: 'normal',
          fontSize: 10,
          time: ele.time,
        };
      } else {
        // ?????????????????????
        // ????????????????????????????????????????????????????????????????????????
        if (rows[0][0].time.length === 2 && rows[1][0].time.length === 2 ) {
          arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
            first: rows[0][0].first.length <= 7 ? rows[0][0].first : `${rows[0][0].first .substr(0, 6)}...`,
            second: rows[0][0].second.length <= 7 ? rows[0][0].second : `${rows[0][0].second.substr(0, 6)}...`,
            third: rows[1][0].first,
            fourth: rows[1][0].second,
            color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 10,
            time: ele.time,
          };
          arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = {
            first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
            second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
            third: ele.room,
            fourth: `[${ele.date[0]}]`,
            color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 10,
            time: ele.time,
          }
        }
        // TODO: ??? 3 ?????????????????????
        // ??? 4 ????????????
        if (rows[0][0].time.length === 4 || rows[1][0].time.length === 4) {
          if (rows[1][0].fontSize === 10) {
            // ??????????????????????????????????????????????????????????????????????????????????????????????????????
            arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
              first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
              second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
              third: ele.room,
              fourth: `[${ele.date[0]}]`,
              fifth: `??? ${ele.time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
              color: colorArray[Number(ele.time[0][1])][Number(ele.time[0][0])],
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 10,
              time: ele.time,
            };
            arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0] = Object.assign(arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0], {
              first: arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].first.length <= 7 ? arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].first : `${arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].first.substr(0,6)}...`,
              second: arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].second.length <= 7 ? arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].second : `${arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].second.substr(0,6)}...`,
              fifth: `??? ${arr[Number(ele.time[1][1])][Number(ele.time[1][0])][0].time.map(it => {return `${Number(it[1]) + 1}`})} ???`
            })
          } else {
            // ??????????????????????????????????????????????????????????????????????????????????????????????????????
            arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0] = {
              first: ele.teacher.length <= 7 ? ele.teacher : `${ele.teacher.substr(0, 6)}...`,
              second: ele.courseName.length <= 7 ? ele.courseName : `${ele.courseName.substr(0, 6)}...`,
              third: ele.room,
              fourth: `[${ele.date[0]}]`,
              fifth: `??? ${ele.time.map(it => {return `${Number(it[1]) + 1}`})} ???`,
              color: arr[Number(ele.time[0][1])][Number(ele.time[0][0])][0].color,
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 10,
              time: ele.time,
            };
          }
        }
      }
    }
  });

  return arr.map(row => {
    return row.map(item => {
      if (item.length !== 0) {
        return (<View>
          {item.map((it, index) => {
            /* eslint-disable */
            return (
              <View key={index} style={{
                borderBottomColor: it.color,
                backgroundColor: it.color,
                borderBottomWidth: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: it.justifyContent,
                width: '100%',
                height: '100%',
                paddingLeft: 5,
                paddingRight: 5,
              }}>
                <Text style={{ display: it.first === '' ? 'none' : 'flex', fontSize: 10, color: '#fff', paddingBottom: 2, paddingTop: 2 }}>{it.first}</Text>
                <Text style={{ display: it.second === '' ? 'none' : 'flex', fontSize: it.fontSize, color: '#fff', paddingBottom: 2, paddingTop: 2, fontWeight: it.fontWeight }}>{it.second}</Text>
                <Text style={{ display: it.third === undefined || it.third === '' ? 'none' : 'flex', fontSize: 10, color: '#fff', paddingBottom: 2, paddingTop: 2 }}>{it.third}</Text>
                <Text style={{ display: it.fourth === undefined || it.fourth === '' ? 'none' : 'flex', fontSize: 10, color: '#fff', paddingBottom: 2, paddingTop: 2 }}>{it.fourth}</Text>
                <Text style={{ display: it.fifth === undefined || it.fifth === '' ? 'none' : 'flex', fontSize: 10, color: '#fff', paddingBottom: 2, paddingTop: 2 }}>{it.fifth}</Text>
              </View>
              /* eslint-enable */
            )
          })}
        </View>);
      }
      return null;
    })
  });
};