# 토이프로젝트 스크롤 이벤트를 활용한 프로그래스바 구현  

![Animation1233](https://user-images.githubusercontent.com/127499117/235672875-9357cef3-e48b-453b-9808-683adc75278a.gif)


> 스크롤 이벤트를 사용하여, 이벤트가 발생할 때마다 bar로 지정해 준 DOM의 width 값이 변경되도록 구현하였다. 스크롤 이벤트를 배우면서 이벤트의 디바운스(debounce), 스로틀(throttle)도 함께 배웠다. 개념은 이해했지만, 아직 나에게 익숙하지 않은 코드라 더 많은 연습이 필요하고 익숙해질 필요가 있어 보인다. 특히나 scroll, resize, input, mousemove 같은 이벤트를 사용하게 되면, 이벤트가 굉장히 빠르게 연속적으로 발생하게 되고. 이렇게 과도하게 이벤트가 발생하면 성능에 문제를 일으킬 수 있기때문에  2가지 개념을 꼭! 알아두는 것이 이벤트를 다루는 데 있어 매우 중요하다고 생각됐던 토이프로젝트였다! 

<br/>
<br/>

## 새로 배운 것들

 <br/>

```js
 const get = (target) => {
    return document.querySelector(target);
  };
  let timerId;
  const $progressBar = get('.progress-bar');
  const $progressText = $progressBar.querySelector('.text');

  const throttle = (callback, time) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = undefined;
    }, time);
  };

  const onScroll = () => {
    const $html = document.documentElement;
    const height = $html.scrollHeight - $html.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    const percent = Math.floor((scrollTop / height) * 100);

    $progressBar.style.width = `${percent}%`;
    $progressText.innerText = `${percent}%`;
  };

  window.addEventListener('scroll', () => {
    throttle(onScroll, 100);
  });
```

## 1.디바운스(debounce)

- 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것
- 디바운스는 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정 시간이 경과한 이후에 이벤트 핸들러가 한 번만 호출되도록 한다. 즉 디바운스는 짧은 시간 간격으로 발생하는 이벤트를 그룹화해서 마지막에 한 번만 이벤트 핸들러가 호출 되도록 한다. resize 이벤트 처리나 input요소에 입력된 값으로 ajax 요청하는 입력 필드 자동완성 UI 구현, 버튼 중복 클릭 방지 처리 등에 유용하다.
- 실무에서는 Underscore의 debounce함수나 Lodash의 debounce 를 사용하는 것을 권장한다 https://underscorejs.org/#debounce  https://lodash.com/docs/4.17.15#debounce

 <br/>
 
## 2. 스로틀 (throttle)
- 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
- 스로틀은 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 이벤트 핸들러가 최대 한 번만 호출되도록 한다. 즉, 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호촐되도록 호출 주기를 만든다. 내가 설정한 시간(delay)가 경과하기 이전에 이벤트가 발생하면 아무것도 하지않다가 시간이 경과했을 때 이벤트가 발생하면 실행하고, 타이머를 재설정한다. 따라서 delay 시간 간격으로 이벤트가 발생한다. 이처럼 짧은 시간 간격으로 발생하는 이벤트를 그룹화해서 일정 시간 간격으로 이벤트 핸들러를 호출하는 스로틀은 scroll이벤트 처리나 무한스크롤 UI 구현 등에 유용하게 사용된다.
- 실무에서는 Underscore의 debounce함수나 Lodash의 debounce 를 사용하는 것을 권장한다 https://underscorejs.org/#throttle https://lodash.com/docs/4.17.15#throttle

<br/>

## 3. 요소 사이즈와 스크롤 
> 밑에 그림으로 브라우저의 크기, 문서의 전체크기등을 너무 쉽게 이해 할 수 있도록 설명해주셔서 밑에 그림을 참고하여 구현할 수 있었다.

![제목-없음-1](https://user-images.githubusercontent.com/127499117/235673744-8b7919eb-adfc-4397-bd3b-b0da1357606f.jpg)

출저 : https://ko.javascript.info/size-and-scroll

