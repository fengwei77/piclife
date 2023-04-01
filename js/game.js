var data;
var cart_tree = {
    data: [
        {
            "type": "A",
            "item": "3",
            "base_line": "3.5",
            "lt": ["A", "5"],
            "gt": ["C", "3"],
        },
        {
            "type": "A",
            "item": "5",
            "base_line": "1.5",
            "lt": ["A", "0"],
            "gt": ["D", "9"]
        },
        {
            "type": "D",
            "item": "9",
            "base_line": "4.5",
            "lt": ["D", "4"],
            "gt": ["I", "0"]
        },
        {
            "type": "D",
            "item": "4",
            "base_line": "2.5",
            "lt": ["B", "7"],
            "gt": ["D", "10"]
        },
        {
            "type": "B",
            "item": "7",
            "base_line": "2.5",
            "lt": ["A", "2"],
            "gt": ["G", "0"]
        },
        {
            "type": "A",
            "item": "2",
            "base_line": "1.5",
            "lt": ["A", "0"],
            "gt": ["B", "0"]
        }
        ,
        {
            "type": "D",
            "item": "10",
            "base_line": "3.5",
            "lt": ["D", "5"],
            "gt": ["J", "7"]
        },
        {
            "type": "D",
            "item": "5",
            "base_line": "3.5",
            "lt": ["D", "0"],
            "gt": ["E", "0"]
        },
        {
            "type": "J",
            "item": "7",
            "base_line": "3.5",
            "lt": ["G", "0"],
            "gt": ["J", "0"]
        }
        ,
        {
            "type": "C",
            "item": "3",
            "base_line": "4.5",
            "lt": ["C", "8"],
            "gt": ["C", "0"]
        }
        ,
        {
            "type": "C",
            "item": "8",
            "base_line": "3.5",
            "lt": ["C", "10"],
            "gt": ["H", "0"]
        }
        ,
        {
            "type": "C",
            "item": "10",
            "base_line": "3.5",
            "lt": ["C", "6"],
            "gt": ["J", "0"]
        }
        ,
        {
            "type": "C",
            "item": "6",
            "base_line": "3.5",
            "lt": ["C", "0"],
            "gt": ["F", "0"]
        }
    ]
};
let result;

// async function questions_axios() {
//     let response = await axios.get('js/constitution.json')
//         .then(function (response) {
//             return response.data.questions;
//         });
//     return await response
// }

document.addEventListener('alpine:init', () => {
    Alpine.data('qData', () => ({
        current_ques: 1,
        answer_limit: 5,
        fade_show: false,
        open: false,
        no: 0,
        selectedOption: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        chs_option: [
            ['0', '--', '--', '--', '--', '--'],
            ['1', '', '', '', '', ''],
            ['2', '', '', '', '', ''],
            ['3', '', '', '', '', ''],
            ['4', '', '', '', '', ''],
            ['5', '', '', '', '', ''],
            ['6', '', '', '', '', ''],
            ['7', '', '', '', '', ''],
            ['8', '', '', '', '', ''],
            ['9', '', '', '', '', ''],
            ['10', '', '', '', '', '']],
        all_types: null,
        options: [1, 2, 3, 4, 5],
        error: '',
        person_type: "",
        current_solar_term: "",
        care_body: "content",
        acupuncture_points: "ap content",
        init() {
            var today = new Date();
            this.current_solar_term = getjq(today.getFullYear(), (today.getMonth() + 1), today.getDate());
            console.log(cart_tree.data);
            console.log(this.selectedOption);
            console.log(this.chs_option);
            setTimeout(() => {

                this.open = true;
            }, 500);

            axios.get('js/constitution.json')
                .then(function (response) {
                    this.all_types = response.data.types;
                    // console.log(this.all_types);
                });
        },
        triggerChs(group, id) {
            console.log(group);
            let i = 1;
            while (i <= 5) {
                this.chs_option[group][i] = '';
                i++;
            }
            this.chs_option[group][id] = 'chs';
            console.log(this.chs_option);
            setTimeout(() => {
                if(this.current_ques < 10) {
                    this.current_ques = parseInt(group) + 1;
                }
                if (parseInt(group) + 1 == 11) {
                    this.send();
                }
            }, 100);

            console.log(this.current_ques);
        },
        get_current_solar_term() {
            var today = new Date();
            this.current_solar_term = getjq(today.getFullYear(), (today.getMonth() + 1), today.getDate());
            console.log(cart_tree.data);
            console.log(this.selectedOption);
        },
        gen_name(name, id) {
            console.log(name + "_" + id);
            return name + "_" + id;
        },
        async questions_axios() {
            let response = await axios.get('js/constitution.json')
                .then(function (response) {
                    return response.data.questions;
                });
            return await response;
        },
        get_all_type() {
            axios.get('js/constitution.json')
                .then(function (response) {
                    this.all_types = response.data.types;
                    // console.log(this.all_types);
                })
        },
        async get_condition(pt, term) {
            let response = await axios.get('js/condition.json')
                .then(function (response) {
                    data = response.data;
                    let jsonData = JSON.parse(JSON.stringify(data));
                    let getCond = jsonData[pt];
                    let prev_cate = '';
                    let prev_desc = '';
                    return getCond;
                });

            return await response;
        },
        send() {
            this.care_body = '';
            this.acupuncture_points = '';
            this.open = !this.open;
            let next_id = 'A';
            let ques_id = "3";
            let tier = 0;
            let item_pos = parseInt(cart_tree.data[tier].item) - 1;
            while (tier < 6) {
                if (ques_id > 0) {
                    resultObject = search(next_id, ques_id, cart_tree.data);
                    item_pos = parseInt(resultObject.item) - 1;
                    console.log('resultObject:');
                    console.log(resultObject);
                    console.log(`item ${ques_id}: ${this.selectedOption[item_pos]}`)
                    if (this.selectedOption[item_pos] > resultObject.base_line) {
                        next_id = resultObject.gt[0];
                        ques_id = resultObject.gt[1];
                    } else {
                        next_id = resultObject.lt[0];
                        ques_id = resultObject.lt[1];
                    }
                    console.log(`tier ${tier} 結果是 ${next_id} :　${ques_id}`)
                    if (ques_id == 0) {
                        break;
                    }
                }
                tier += 1;
            }
            if (ques_id == 0) {
                let type_arr = search_type(next_id, all_types);
                console.log(type_arr);
                this.person_type = type_arr.id;
                // location.href = 'process.html?type=' + type_arr.id;
                console.log(`[0] tier ${tier} 結果是 ${next_id} :　${ques_id}`)

                console.log(this.person_type);
                (async () => {
                    result = await this.get_condition(this.person_type, this.current_solar_term);
                    console.log(result);

                    let prev_cate = '';
                    let prev_desc = '';
                    let prev_cont = '';

                    for (let i = 0; i < result.length; i++) {
                        if (prev_cate != result[i]['症狀類別']) {
                            prev_cate = result[i]['症狀類別'];
                            console.log('症狀類別:' + result[i]['症狀類別']);
                        }
                        if (prev_desc != result[i]['症狀描述']) {
                            prev_desc = result[i]['症狀描述'];
                            console.log('症狀描述:' + result[i]['症狀描述']);
                        }
                        if (prev_cont != result[i]['衛教內容']) {
                            prev_cont = result[i]['衛教內容'];
                            console.log('衛教內容:' + result[i]['衛教內容']);
                            if (result[i]['衛教內容'] == '飲食調養') {

                                if (prev_cont != result[i][this.current_solar_term]) {
                                    prev_cont = result[i][this.current_solar_term];
                                    console.log(this.current_solar_term + ':' + result[i][this.current_solar_term]);
                                    this.care_body = prev_cont;
                                }
                            }
                            if (result[i]['衛教內容'] == '穴位調養') {

                                if (prev_cont != result[i][this.current_solar_term]) {
                                    prev_cont = result[i][this.current_solar_term];
                                    console.log(this.current_solar_term + ':' + result[i][this.current_solar_term]);
                                    this.acupuncture_points = prev_cont;
                                }
                            }
                        }
                    }

                })();


                location.href = 'process.html?type=' + type_arr.id;
            }

            for (const value of this.selectedOption) {
                console.log(value);
                if (value == 0) {
                    this.error = '有問題尚未回答!';
                    break;
                } else {
                    this.error = '';
                }
            }
        }

    }))
})

function search(key1, key2, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].type === key1 && myArray[i].item === key2) {
            return myArray[i];
        }
    }
}

function search_type(key1, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === key1) {
            return myArray[i];
        }
    }
}
