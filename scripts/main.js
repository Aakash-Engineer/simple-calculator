let input=document.querySelector('input')
document.querySelector('table').addEventListener('click', function(event){
    let target=event.target;


    if(target.hasAttribute('data-number')){
        let num=target.getAttribute('data-number');
        input.value+=num;
    }
    else if(target.hasAttribute('data-operation')){
        let num=target.getAttribute('data-operation');
        input.value+=num;
    }
    else if(target.hasAttribute('data-submit')){
        let exp=input.value;
        exp=infixToArray(exp)
        exp=infixToPostfix(exp)
        exp=postfixCalculate(exp)
        input.value=exp;
    }
    else(
        input.value=''
    )

})

// Calculator

function infixToArray(infix) {
    // Split the infix string into an array of numbers (including decimals) and operators
    let array = infix.match(/(\d+\.\d+|\d+|\+|\-|\*|\/)/g);
    return array;
}

function infixToPostfix(exp){
    let priority={
        '/': 4, 
        '*': 3, 
        '+': 2, 
        '-': 1
    };
    let stack=[];
    let postfix=[];

    for(key in exp){
        if(!isNaN(exp[key])){
            postfix.push(+exp[key])
        }

        else if(exp[key] == ')'){
            while(stack[stack.length-1] != '('){
                postfix.push(stack.pop());
            }
            stack.pop();
        }

        else if(exp[key] == '('){
            stack.push(exp[key]);
        }

        else{
            while(stack.length > 0 && priority[exp[key]] < priority[stack[stack.length-1]]){          
                postfix = postfix + stack.pop()
            }
            stack.push(exp[key]);
        }
    }

    while(stack.length > 0){
        postfix.push(stack.pop());
    }

    return postfix;
}
// console.log(infixToPostfix(''));


function postfixCalculate(exp){
    let stack=[]

    for(key in exp){
        if(!isNaN(exp[key])){
            stack.push(exp[key]);
        }
        else if(exp[key] == '-' && stack.length==1){
            let top=stack.pop();
            stack.push(-top);
        }
        else{
            let a=stack.pop();
            let b=stack.pop();

            switch(exp[key]){
                case '+':
                    stack.push(b+a);
                    break;
                case '-':
                    stack.push(b-a);
                    break;
                case '*':
                    stack.push(b*a);
                    break;
                case '/':
                    stack.push(b/a);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    }
    return stack.pop();
}

