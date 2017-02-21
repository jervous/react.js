let Mess = React.createClass({
    getInitialState(){
        return {
            IdInputV: '',
            PsdInputV: '',
            selectV: '本科',
            radioV: '男',
            checkV: [],
            idSpan: '',
            pswSpan: '',
            data: []
        }
    },
    handIdinput(){
        this.setState({
            idSpan: '',
            pswSpan: '',
        })
    },
    handSub(e, task){
        e.preventDefault()
        //将注册的数据上传到data.
        let formData = {
            id: ReactDOM.findDOMNode(this.refs.IdInput).value,
            psd: ReactDOM.findDOMNode(this.refs.PsdInput).value,
            xueli: this.state.selectV,
            male: this.state.radioV,
            liked: this.state.checkV,
        };
        let data = this.state.data;  //获取data
      
        let re = /^\w{8,12}$/  //验证账号
        //账号密码验证
        if (formData.id == "" || formData.id == null) {
            this.setState({
                idSpan: '用户名为空',
            })
            ReactDOM.findDOMNode(this.refs.IdInput).value = ''
        } else if (!re.test(formData.id)) {
            this.setState({
                idSpan: '用户名输入有误',
            })
            ReactDOM.findDOMNode(this.refs.IdInput).value = ''

        } else if (formData.psd == "" || formData.psd == null) {
            this.setState({
                pswSpan: '密码为空',
            })
            ReactDOM.findDOMNode(this.refs.PsdInput).value = ''
        } else if (!re.test(formData.psd)) {
            this.setState({
                pswSpan: '密码输入有误',
            })
            ReactDOM.findDOMNode(this.refs.PsdInput).value = ''
        } else {
            data = data.concat([{
                "id": formData.id,
                "psd": formData.psd,
                "xueli": formData.xueli,
                "male": formData.male,
                "liked": formData.liked
            }]);
            this.setState({data});
           
            let postData = 'uid=' + formData.id + "&psd=" + formData.psd + "&xueli=" + formData.xueli + "&male=" + formData.male + "&liked=" + formData.liked;
            $.ajax({
                url: 'http://localhost:8080/',
                type: "POST",
                dataType: "json",
                data: postData,
                success: function (SucMess) {
                    alert(SucMess);
                },
                error: function (errMsg) {
                    console.log('error'+errMsg.toString());
                }
            });

        }
    },
    //获取radio的值
    handRadio(e){
        this.setState({
            radioV: e.target.value,
        })
    },
    //获取check的值
    handCheck(e){
        let checkV = this.state.checkV.slice();
        let newVal = e.target.value;
        let index = checkV.indexOf(newVal);
        if (index == -1) {
            checkV.push(newVal)
        } else {
            checkV.splice(index, 1)
        }
        this.setState({
            checkV: checkV,
        })
    },
    //获取select的值
    handSelect(e){
        this.setState({
            selectV: e.target.value,
        })
    },
    UidBlur(e){

    },
    render(){
        return (
            <div className="well box">
                <div className="colorStyle text-center">注册表单</div>
                <form onSubmit={this.handSub}>
                    {/*id*/}
                    <div className="form-group">
                        <label for="exampleInputEmail1">用户名</label>
                        <input className="form-control" id="exampleInputEmail1" type="text" ref="IdInput"
                               placeholder="8-12位数字/字母" defaultValue={this.state.IdInputV} autoFocus="true"
                               onFocus={this.handIdinput} onBlur={this.UidBlur}/>
                        <div className=" spans idSpan" style={{color: 'red'}}>{this.state.idSpan}</div>
                    </div>
                    {/*psw*/}
                    <div className="form-group">
                        <label for="exampleInputPassword1">密码</label>
                        <input type="password" ref="PsdInput" className="form-control" id="exampleInputPassword1"
                               placeholder="8-12位数字/字母" defaultValue={this.state.PsdInputV} onFocus={this.handIdinput}/>
                        <div className="spans idSpan" style={{color: 'red'}}>{this.state.pswSpan}</div>
                    </div>
                    <RadioButtons ref="goodRadio" handRadio={this.handRadio}/>
                    <SelectChoose handSelect={this.handSelect}/>
                    <CheckButtons handCheck={this.handCheck}/>
                    <button type="submit" className="btn divs col-md-6 col-md-offset-3">提交</button>
                </form>
            </div>
        )
    }
});
//select学历
let SelectChoose = React.createClass({
    render(){
        let checkStyle = {
            width: '50%',
        };
        return (
            <div >
                <span style={{fontWeight: 'bold'}}>学历:</span>
                <select onChange={this.props.handSelect} className="form-control" style={checkStyle}>
                    <option defaultValue="本科">本科</option>
                    <option defaultValue="大专">大专</option>
                    <option defaultValue="高中">高中</option>
                </select >
            </div>
        )
    }
});
//radio性别
let RadioButtons = React.createClass({
    // saySomethis(){
    //     console.log('radio')
    // },
    render: function () {
        let checkStyle = {
            paddingLeft: '10px',
        };
        return (
            <div >
                <span style={{fontWeight: 'bold'}}>性别:</span>
                <label htmlFor='optionsRadios1' onChange={this.props.handRadio} style={checkStyle}>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" defaultChecked defaultValue="男"/>
                    男
                </label>
                <label htmlFor='optionsRadios2' onChange={this.props.handRadio} style={checkStyle}>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="女"/>
                    女
                </label>
            </div>
        )
    }
});
//check爱好
let CheckButtons = React.createClass({
    render: function () {
        let checkStyle = {
            paddingLeft: '10px',
        };
        let divs = {
            marginTop: '10px'
        };
        return (
            <div style={divs}>
                <span style={{fontWeight: 'bold'}}>爱好:</span>
                <label htmlFor="radio4" style={checkStyle}>
                    <input type="checkbox" id="radio4" defaultValue="打球" onChange={this.props.handCheck}/>打球
                </label>
                <label htmlFor="radio5" style={checkStyle}>
                    <input type="checkbox" id="radio5" defaultValue="打游戏"
                           onChange={this.props.handCheck}/>打游戏
                </label>
                <label htmlFor="radio6" style={checkStyle}>
                    <input type="checkbox" id="radio6" defaultValue="旅游" onChange={this.props.handCheck}/>旅游
                </label>
            </div>

        )
    }
});


ReactDOM.render(<Mess/>,
    document.getElementById('exs'),
    function () {
        console.log('完成')
    });
/**
 * Created by thinkpad on 2017/2/16.
 */
