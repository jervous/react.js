
let Mess = React.createClass({
    getInitialState(){
        return{
            IdInputV:'',
            PsdInputV:'',
            selectV:'男',
            radioV:'本科',
            checkV:[],
            idSpan:'',
            disable:true,
            data:[]
        }
    },
    handClear(obj){
       return ReactDOM.findDOMNode(this.refs.obj).value=''
    },
    generateId() {
        return Math.floor(Math.random() * 9000) + 1000;
    },
    handSub(e,task){
        e.preventDefault()
        //将注册的数据上传到data.
        let formData={
            id:ReactDOM.findDOMNode(this.refs.IdInput).value,
            psd:ReactDOM.findDOMNode(this.refs.PsdInput).value,
            select:ReactDOM.findDOMNode(this.refs.goodSelect).value,
            radio:this.state.radioV,
            check:this.state.checkV,
        };
        let data=this.state.data;
        this.refs.goodRadio.saySomethis()
        let re=/^\w{8,12}$/  //验证账号
        if(formData.id==""||formData.id==null){
                this.setState({
                    idSpan:'用户名为空',
                })
            ReactDOM.findDOMNode(this.refs.IdInput).value=''
        }else if(!re.test(formData.id)){
            this.setState({
                idSpan:'用户名输入有误',
            })
            ReactDOM.findDOMNode(this.refs.IdInput).value=''

        } else if(formData.psd==""||formData.psd==null){
            this.setState({
                idSpan:'密码为空',
            })
            ReactDOM.findDOMNode(this.refs.PsdInput).value=''
        }else if(!re.test(formData.psd)){
            this.setState({
                idSpan:'密码输入有误',
            })
            ReactDOM.findDOMNode(this.refs.PsdInput).value=''
        }else{
            data = data.concat([{"id": formData.id, "psd": formData.psd, "select": formData.select,"radio":formData.radio,"check":formData.check}]);
            this.setState({data});
            console.log(data)
        }
    },
    handRadio(e){
        this.setState({
            radioV:e.target.value,
        })
    },
    handCheck(e){
        let checkV=this.state.checkV.slice();
        let newVal=e.target.value;
        let index=checkV.indexOf(newVal);
        if(index==-1){
            checkV.push(newVal)
        }else{
            checkV.splice(index,1)
        }
        this.setState({
            checkV:checkV,
        })
    },
    render(){
        return (
            <div className="boxDiv well"><div className="colorStyle text-center">注册表单</div>
            <form onSubmit={this.handSub}>
    <p>用户名:<input type="text" ref="IdInput" placeholder="8-12位数字/字母" defaultValue={this.state.IdInputV} autoFocus="true"/><span className="spans idSpan" style={{color:'red'}}>{this.state.idSpan}</span></p>
        <p>密码:<input type="text" ref="PsdInput" placeholder="8-12位数字/字母" defaultValue={this.state.PsdInputV}/></p>
        <p>性别:<select defaultValue={this.state.selectV} ref="goodSelect" >
            <option value="男">男</option>
            <option value="女">女</option>
            </select ></p>
            <RadioButtons ref="goodRadio" handRadio={this.handRadio}/>
    <br/>
        <CheckButtons handCheck={this.handCheck} />
    <br/>
        <button type="submit" className="btn" >提交</button>
            </form>

            </div>
    )
    }
});
let RadioButtons=React.createClass({
    saySomethis(){
        console.log('radio')
    },
    render:function () {
        return(
            <div>
            学历:
        <br/>
        <span className="radioSpan">
        <label htmlFor='radio1'>本科:</label>
        <input type="radio" id="radio1" name="radios" defaultChecked defaultValue="本科" onChange={this.props.handRadio}/>
        <label htmlFor='radio2'>大专:</label>
        <input type="radio" id="radio2" name="radios" defaultValue="大专" onChange={this.props.handRadio}/>
        <label htmlFor='radio3'>高中:</label>
        <input type="radio" id="radio3" name="radios"  defaultValue="高中" onChange={this.props.handRadio}/>
        </span>
        </div>
        )
    }
})
let CheckButtons=React.createClass({
    render:function () {
        return(
            <div>
            爱好:
        <br/>
        <span>
        <label htmlFor='radio4'>阅读:</label>
        <input type="checkBox" id="radio4" defaultValue="阅读" onChange={this.props.handCheck}/>
        <label htmlFor='radio5'>看书:</label>
        <input type="checkBox" id="radio5" defaultValue="看书" onChange={this.props.handCheck}/>
        <label htmlFor='radio6'>旅游:</label>
        <input type="checkBox" id="radio6" defaultValue="旅游" onChange={this.props.handCheck}/>
        </span>
        </div>

        )
    }
})


ReactDOM.render(<Mess/>,
    document.getElementById('exs'),
    function(){
        console.log('完成')
    });/**
 * Created by thinkpad on 2017/2/16.
 */
