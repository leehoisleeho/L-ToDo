import{s as x,a as U}from"./function-call.3337e31e.js";import{t as V,s as $,a as B,b as N,_ as E}from"./util.a31f0905.js";import{h as R,s as q}from"./index.71b9cbcb.js";import"./index.092e994c.js";import{d as A,a as D,r as s,k as G,l as T,q as a,z as r,A as c,s as i,m as p,v as j,x as F,y as H}from"./entry.846cef3d.js";import{_ as J}from"./_plugin-vue_export-helper.c27b6911.js";const f=_=>(F("data-v-8203e916"),_=_(),H(),_),K=f(()=>p("div",{class:"header"},[p("img",{src:E,alt:""})],-1)),L=f(()=>p("span",{class:"state",style:{background:"#ea4335"}},"紧急",-1)),M=f(()=>p("span",{class:"state",style:{background:"#fbbc23"}},"星标",-1)),O={class:"btnBox"},P=A({__name:"create",setup(_){const b=D(),m=s([]),n=s(!1),y=o=>{l.value=V(o),n.value=!1},l=s("默认选择当前日期");l.value=V(new Date);const u=s(""),d=s(""),h=s(0),g=s(0),w=()=>{m.value.forEach(o=>{o==="urgent"?h.value=1:o==="star"&&(g.value=1)})},C=async()=>{if(w(),u.value){const o={uuid:localStorage.getItem("uuid"),title:u.value,content:d.value?d.value:"无描述",time:l.value,urgentState:h.value,starState:g.value};R.post("/todolist/create",o).then(e=>{e.error===0&&(x({type:"success",message:"创建成功",duration:600}),b.push("list"))})}else x({type:"warning",message:"标题不能为空",duration:600})};return(o,e)=>{const v=U,k=$,S=B,z=N,I=q;return G(),T("div",null,[K,a(v,{type:"text",modelValue:r(u),"onUpdate:modelValue":e[0]||(e[0]=t=>c(u)?u.value=t:null),autosize:"",placeholder:"请输入标题"},null,8,["modelValue"]),a(v,{rows:"5",autosize:"",type:"textarea",placeholder:"请输入详情",modelValue:r(d),"onUpdate:modelValue":e[1]||(e[1]=t=>c(d)?d.value=t:null)},null,8,["modelValue"]),a(v,{name:"checkboxGroup"},{input:i(()=>[a(S,{modelValue:r(m),"onUpdate:modelValue":e[2]||(e[2]=t=>c(m)?m.value=t:null),direction:"horizontal"},{default:i(()=>[a(k,{name:"urgent","checked-color":"#e94235","icon-size":"20px"},{default:i(()=>[L]),_:1}),a(k,{name:"star","checked-color":"#fabb22","icon-size":"20px"},{default:i(()=>[M]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(v,{modelValue:r(l),"onUpdate:modelValue":e[3]||(e[3]=t=>c(l)?l.value=t:null),"is-link":"",readonly:"",name:"calendar",placeholder:"点击选择日期",onClick:e[4]||(e[4]=t=>n.value=!0)},null,8,["modelValue"]),a(z,{show:r(n),"onUpdate:show":e[5]||(e[5]=t=>c(n)?n.value=t:null),onConfirm:y},null,8,["show"]),p("div",O,[a(I,{type:"primary",block:"",onClick:C},{default:i(()=>[j("新建事件")]),_:1})])])}}});const te=J(P,[["__scopeId","data-v-8203e916"]]);export{te as default};