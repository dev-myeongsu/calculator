## 계산기 만들기

1. 숫자 버튼을 클릭하면 해당 숫자가 출력칸에 표시됩니다. 예를 들어, 1을 클릭하면 1이 출력되고, 1과 2를 연속으로 클릭하면 두 숫자가 이어진 12가 표시됩니다. 마찬가지로 6, 8, 7을 차례로 클릭하면 세 자리 숫자인 687이 출력됩니다.

2. 숫자가 표시된 상태에서 사칙연산 기호 버튼을 클릭하면 출력칸에 표시된 숫자가 사라집니다. 사라진 숫자는 이후 계산을 위한 첫 번째 피연산자로 내부에 저장되며, 출력칸은 다음 숫자를 입력받을 상태가 됩니다.

3. 다시 한번 숫자를 클릭하면 1번과 마찬가지로 입력한 숫자가 출력칸에 표시됩니다. 예를 들어, 3과 0을 차례로 클릭하면 30이 출력됩니다.

4. 숫자가 출력칸에 표시된 상태에서 등호를 클릭하면 지금까지 입력한 수식의 연산 결과가 출력됩니다. 예를 들어, 12를 입력한 뒤 +와 30을 입력한 다음 등호를 클릭하면 12 + 30의 결과인 42가 출력됩니다. 만약 등호 대신 다른 연산 기호를 클릭하면 등호를 누를 때까지 2번과 3번 과정을 반복하여 다음 숫자를 계속 입력할 수 있습니다.

5. 한 번 연산이 끝난 뒤에는 등호를 다시 클릭해도 아무 일도 일어나지 않습니다.

6. 연산 결과가 출력된 상태에서 숫자를 클릭하면 기존 결과 뒤에 숫자가 이어서 표시됩니다. 예를 들어, 현재 출력된 값이 42일 때 5를 클릭하면 425가 출력됩니다.

7. 이 상태에서 사칙연산 기호를 클릭하면 다시 2번 과정부터 반복됩니다.

## useState 훅: 기본 상태 관리 <img src="https://img.shields.io/badge/React-black?style=for-the-badge&logo=React&logoColor=61DAFB">

리액트에서는 상태를 관리할 때 훅을 사용합니다. 훅(hook)이란 함수형 컴포넌트에서 상태(state)와 생명주기(lifecycle)를 쉽게 관리할 수 있도록 도와주는, 리액트에서 제공하는 특별한 함수입니다. 훅은 2018년 10월 25일 ReactConf에서 처음 소개되었으며, 2019년 2월 6일에 출시한 리액트 16.8부터 정식으로 도입되었습니다.

가장 대표적인 훅으로는 useState와 useReducer가 있습니다. 컴포넌트에서 상태를 정의할 때 가장 기본으로 사용하는 useState 훅을 살펴보겠습니다.

<details>
<summary><strong>useState 훅의 기본 문법</strong></summary>

useState 훅은 [이전_상태(값), 상태_변경_함수] 형태의 배열을 반환하는 함수입니다. 이 배열을 구조 분해 할당하면 컴포넌트 내부에서 상태를 저장하고 변경할 수 있는 2개의 변수를 선언할 수 있습니다. 두 변수를 사용해 컴포넌트의 상태를 효과적으로 관리할 수 있습니다. 상태 값이 변경되면 리액트는 해당 컴포넌트를 자동으로 리렌더링(re-rendering)해 UI를 새로운 상태로 업데이트합니다.

useState 훅은 다음과 같은 형식으로 사용합니다.

```typescript
const [state, setState] = useState<Type>(initialState);
```

- state: 상태 값을 저장하는 변수로, 보통 상태 변수라고 부릅니다. state라는 이름은 단순한 예일 뿐이며, 관리하려는 상태의 성격에 맞게 자유롭게 이름 지어도 됩니다. 예를 들어 숫자를 관리한다면 count, 문자열이면 text와 같이 이름을 짓습니다.

- setState: 상태를 변경하는 함수로, 상태 변경 함수라고 부릅니다. 일반적으로 상태 변수 이름 앞에 set을 붙여 이름을 짓습니다. 예를 들어 상태 변수가 count라면, 상태 변경 함수는 setCount가 됩니다.

- initialState: 상태의 초깃값을 의미합니다. 컴포넌트가 처음 렌더링될 때 이 값으로 상태가 초기화됩니다. 초깃값을 생략하면 기본으로 undefined가 할당되는데, 이 경우 연산 중 예기치 않은 오류가 발생할 수 있으므로 주의해야 합니다.

이제 useState 훅을 사용할 때 꼭 알아야 할 개념들을 하나씩 살펴보겠습니다.

- 제네릭 타입

  타입스크립트에서는 특정 타입에 고정되지 않고, 다양한 타입에서 재사용할 수 있는 기능인 제네릭(generic)을 제공합니다. 제네릭을 사용하면 타입을 보다 유연하게 다룰 수 있으며, 하나의 로직을 여러 타입에 적용할 수 있습니다.

  제네릭을 사용하지 않으면 같은 로직이라도 숫자와 문자열을 처리하는 함수를 따로 정의해야 합니다. 그럴 경우 코드에 중복이 생길 수 있고, 유지 관리도 어려워질 수 있습니다.

  다음은 숫자용 함수와 문자열용 함수를 따로 만든 예제입니다.

  ```typescript
  function identityNumber(value: number): number {
    return value;
  }
  function identityString(value: string): string {
    return value;
  }
  ```

  반면, 제네릭을 사용하면 T라는 제네릭 타입 변수를 통해 어떤 타입이든 받을 수 있습니다. T의 실제 타입은 함수를 호출할 때 자동으로 결정되며, 입력 값의 타입에 따라 반환 값의 타입도 함께 결정됩니다.

  다음 함수를 봅시다. 이 함수는 다음과 같이 호출할 수 있습니다.
  - identity<number>(42): T는 number가 되어 반환 값도 number입니다.
  - identity<string>('Hello!'): T는 string이 되어 반환 값도 string입니다.

  ```typescript
  function identity<T>(value: T): T {
    return value;
  }
  ```

  이처럼 제네릭을 사용하면 같은 함수 코드를 다양한 타입에 유연하게 재사용할 수 있습니다. 또한, 타입스크립트의 장점인 타입 안정성(type safety)도 유지할 수 있습니다.

  useState 훅은 기본으로 타입 추론을 지원합니다. 따라서 타입을 명시하지 않아도 타입스크립트가 초깃값을 기준으로 상태 값의 타입을 자동으로 추론합니다.

  ```typescript
  const [count, setCount] = useState(0); // count의 타입을 number로 추론
  const [text, setText] = useState("Hello"); // text의 타입을 string으로 추론
  ```

  그러나 경우에 따라 상태 값의 타입을 명확하게 지정하고자 할 때는 제네릭을 사용해 타입을 직접 지정할 수 있습니다.

  ```typescript
  const [value, setValue] = useState<number>(0); // number 타입 명시
  const [data, setData] = useState<string>("Hello"); // string 타입 명시
  ```

  다음과 같은 경우에는 제네릭을 반드시 사용해야 합니다.

  ```typescript
  const [value, setValue] = useState<number | undefined>(); // --- i
  const [data, setData] = useState<string | null>(null); // ------ ii
  ```

  1. 초기값이 없으면 value의 타입은 자동으로 undefined로 추론합니다. 이처럼 초깃값이 없거나 동적으로 결정될 경우 정확한 타입은 명시하지 않으면 연산 중 오류가 발생할 수 있습니다. 따라서 제네릭을 사용해 타입을 명확히 지정해야 합니다.

  2. 초깃값은 null이지만, 이후 문자열(string) 값을 상태로 저장한다면 제네릭을 사용해 상태의 전체 타입(string | null)을 지정해야 합니다.

  > TIP - | 기호를 사용해 여러 타입을 나열하는 것을 유니언 타입(union type)이라고 합니다. 유니언 타입은 타입스크립트에서 여러 타입 중 하나의 값을 가질 수 있도록 허용하는 문법입니다. 즉, string | null은 유니언 타입으로, 값이 string이거나 null일 수 있음을 명시하는 방법입니다.

  객체 형태의 상태를 다룰 때도 useState 훅에 제네릭을 사용해 타입을 지정할 수 있습니다. 다음 예제는 상태 값의 타입을 User 인터페이스로 지정한 경우입니다.

  ```typescript
  interface User {
    name: string;
    age: number;
  }
  const [user, setUser] = useState<User>({ name: "Alice", age: 25 });
  ```

  이렇게 작성하면 setUser는 User 타입과 일치하는 { name: string, age: number} 구조의 객체만 받을 수 있고, 타입이 다를 경우 컴파일 오류가 발생합니다.

- 상태 변수

  상태 변수는 리액트에서 컴포넌트의 상태를 관리하기 위해 사용하는 특별한 변수입니다. useState 훅을 사용해 선언하며, let이나 const로 선언한 변수와 달리 리액트 내부에서 값의 변경을 감지합니다. 따라서 상태 변수의 값이 변경되면 해당 컴포넌트는 자동으로 리렌더링되어 UI가 업데이트됩니다.

  useState 훅의 매개변수로 전달한 값은 상태 변수의 초깃값이 됩니다. 이때 상태 변수에 저장된 값을 상태 값(state value)이라고 합니다. 즉, state는 상태를 저장하는 변수(예: count)이고, 상태 값은 상태 변수가 현재 가지고 있는 값(예: 10)입니다.

  예를 들어, 다음 코드에서 상태 값은 10입니다.

  ```typescript
  const [state, setState] = useState(10); // 초깃값 10
  ```

  상태 값을 변경할 때는 다음과 같이 변수에 값을 직접 재할당하면 안 됩니다.

  ```typescript
  count = 10;
  ```

  이렇게 작성하면 오류가 발생할 뿐 아니라 리액트가 변경 사항을 감지하지 못해 화면에 반영되지 않습니다. 반드시 setState와 같은 상태 변경 함수를 사용해야 리액트가 상태 변화를 인식하고 UI를 다시 그립니다.

- 상태 변경 함수

  useState로 선언한 상태 변수의 값을 변경할 때는 반드시 상태 변경 함수를 사용해야 합니다. 상태 변경 함수는 다음 두 가지 방식으로 사용할 수 있습니다.
  1. 상태 값을 직접 전달하는 방식

     상태 변경 함수에 변경하려는 값을 직접 전달해 상태를 업데이트합니다.

     ```typescript
     상태_변경_함수(값);
     ```

     예를 들어, 숫자 값을 0으로 초깃값으로 갖는 count 상태를 정의한 코드는 다음과 같습니다.

     ```typescript
     const [count, setCount] = useState<number>(0); // 타입 추론으로 <number> 생략 가능
     ```

     count는 초깃값 0을 저장합니다. 이 값을 변경하려면 다음과 같이 setCount에 새 값을 직접 전달합니다.

     ```typescript
     setCount(1); // count 값을 1로 변경
     ```

     이 방법은 상태 값이 무엇이든 상관없이 특정 값으로 상태를 덮어쓰고 싶을 때 유용합니다.

  2. 이전 상태 값을 참조하는 방식

     상태 변경 함수에 콜백 함수(callback function)를 전달하면 업데이트 이전 상태 값이 함수의 매개변수로 전달됩니다.

     ```typescript
     상태_변경_함수((이전_상태_값) => 변경할_상태_값);
     ```

     예를 들어, count 상태 값을 1 증가시키고 싶을 때는 다음과 같이 작성합니다.

     ```typescript
     const [count, setCount] = useState(0); // 초깃값: 0
     const increment = () => {
       setCount((count) => count + 1); // 이전 값에서 1 증가
     };
     ```

     이 방식은 이전 상태 값을 기반으로 새로운 값을 계산해야 할 때 유용합니다. 특히 상태 업데이트가 비동기적으로 처리될 수 있는 상황에서 정확한 상태 값을 반영하려면 이 방식이 안전합니다.

     > 여기서 말하는 이전 상태 값이란 상태 업데이트가 실행되기 바로 직전의 값을 의미합니다. 문맥에 따라 이전 상태 값, 현재 상태 값, 최신 상태 값이라고 부르기도 하지만, 모두 같은 개념을 가리킵니다.

</details>

<details>
<summary><strong>useState 훅 사용하기</strong></summary>

이번에는 useState 훅을 실제로 어떻게 사용하는지 예제로 살펴보겠습니다.

다음은 숫자 상태 값 count를 정의하고, 버튼 클릭 시 숫자를 1씩 증가시키는 예제입니다.

```typescript
import { useState } from 'react'; // ---------------------------- 1

export default function App() {
  const [count, setCount] = useState(0); // --------------------- 2
  const clickHandler = () => setCount(count => count + 1); // --- 3
  return (
    <div>
    <h1>Count: {count}</h1>
    <button onClick={clickHandler}>증가</button>
    </div>
  )
}
```

1. useState는 리액트의 내장 훅이므로 react 패키지에서 불러와야 합니다.

2. useState(0)을 호출해 count라는 상태를 선언하고 초깃값을 0으로 설정합니다. 상태의 타입은 <number>처럼 제네릭으로 명시할 수 있지만, 타입스크립트는 초깃값을 기준으로 타입을 추론하므로 생략해도 무방합니다.

3. clickHandler() 함수는 버튼을 클릭할 때 실행되어 count 상태 값을 1 증가시킵니다. 콜백 함수의 매개변수로 업데이트 직전의 상태 값이 전달되므로 이를 기반으로 새로운 값을 계산할 수 있습니다.

코드를 저장하고 실행해보면 [증가] 버튼을 클릭할 때마다 count 값이 1씩 증가합니다.

이처럼 리액트에서는 상태 값이 변경되면 해당 상태를 정의한 컴포넌트를 자동으로 리렌더링해 새로운 상태 값이 화면에 반영되도록 처리합니다.

useState 훅을 사용한 상태 관리 흐름을 정리하면 다음과 같습니다.

1. useState 훅으로 상태를 생성합니다.

2. 상태*변경*함수(새로운\_값)을 호출해 상태를 변경합니다.

3. 리액트는 이전 상태 값과 새로운 값을 비교해 변경 여부를 판단합니다.

4. 상태가 변경되었다면 해당 컴포넌트를 리렌더링합니다.

> 이전 상태 값을 기준으로 상태를 변경할 때는 setCount(count + 1)처럼 작성해도 되지만, setCount(count => count + 1)처럼 콜백 함수 형태로 작성하는 방식을 더 권장합니다. 이 방식은 상태 값을 안전하게 참조할 수 있어 얘기치 않은 문제를 방지할 수 있습니다.

</details>

<details>
<summary><strong>useState 훅 여러 번 사용하기</strong></summary>

useState 훅은 한 번에 하나의 상태 값만 관리할 수 있습니다. 따라서 컴포넌트 내부에서 여러 개의 상태 값이 필요하다면 useState를 여러 번 호출해 각 상태를 따로 정의해야 합니다. 이때 상태 변수의 이름(식별자)이 중복되지 않도록 주의해야 합니다.

예를 들어, 이름(name), 나이(age), 성별(gender)을 각각 상태로 관리하려면 다음과 같이 작성합니다.

```typescript
import { useState } from "react";

export default function App() {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  // ...
}
```

이 방식은 각 상태를 독립적으로 업데이트할 수 있다는 장점이 있습니다. 하지만 상태 개수가 많아지면 useState 훅도 많아지고, 상태 변경 함수도 늘어나면서 코드가 복잡해지는 단점이 있습니다.

이런 경우 여러 상태 값을 하나의 객체로 묶어 관리하는 방법을 사용할 수 있습니다.

```typescript
export default function App() {
  const [formState, setFormState] = useState({
    name: "",
    age: 0,
    gender: "",
  });
  // ...
}
```

이 방식은 useState 훅을 한 번만 사용해도 여러 값을 한꺼번에 다룰 수 있어 코드가 더 간결해집니다. 하지만 객체 안 특정 속성만 변경하려면 전개 연산자(...)을 사용해 기존 객체를 복사한 후 일부 속성만 바꿔야 합니다.

</details>

<details>
<summary><strong>useState 훅 사용 시 주의사항</strong></summary>

useState 훅을 사용할 때 몇 가지 주의해야 할 점이 있습니다.

- 초기값 타입 지정

  다음은 이름, 나이, 성별에 대한 상태를 정의할 때 모두 null을 초깃값으로 지정한 예제입니다.

  ```typescript
  import { useState } from "react";

  export default function App() {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const clickHandler = () => {
      setName("Mike"); // 타입 오류 발생
      setAge(23); // 타입 오류 발생
      setGender("female"); // 타입 오류 발생
    };
    return (
      <div>
      <p>이름 : {name}</p>
      <p>나이 : {age}</p>
      <p>성별 : {gender}</p>
      <button onClick={clickHandler}>변경</button>
      </div>
    )
  }
  ```

  코드에서 null을 초깃값으로 전달했기 때문에 타입스크립트는 name, age, gender 상태의 타입으로 자동으로 null로 추론합니다. 그 결과, 이후 문자열이나 숫자 값을 상태에 할당하려 하면 타입 불일치로 오류가 발생합니다.

  이러한 오류를 방지하려면 초기에 상태가 null이더라도 나중에 저장할 타입까지 고려해 제네릭을 명시해야 합니다.

  ```typescript
  import { useState } from "react";

  export default function App() {
    const [name, setName] = useState<string | null>(null);
    const [age, setAge] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    (중략)
  ```

  일반적으로 useState 훅의 초깃값만으로 타입을 명확히 추론할 수 있을 경우 제네릭을 생략해도 무방합니다. 하지만 초깃값이 null, undefined, [] 등 불분명한 타입일 경우 제네릭 타입을 명시하는 것이 좋습니다.

  useState 훅에 <string | null>, <number | null>과 같이 유니언 타입을 제네릭으로 명시하면 초기값이 null이더라도 이후에 문자열이나 숫자를 문제없이 상태에 저장할 수 있습니다.

  > 타입 추론이 가능한 상황에서는 굳이 제네릭을 명시하지 않아도 됩니다. 불필요한 코드 중복을 줄이기 위해 가능한 경우 타입 생략을 선호합니다. 다만, 타입을 명시해야 하는 상황이라면 정확하게 지정하는 것이 좋습니다. 이는 개발자의 스타일에 따라 달라질 수 있습니다.

- 리액트 훅의 호출 위치

  useState 같은 리액트 훅은 반드시 함수형 컴포넌트 내부의 최상위에서 호출해야 합니다. 여기서 최상위(top-level)란 컴포넌트 함수 내부에서 조건문(if), 반복문(for), 함수 정의, 이벤트 핸들러 등 어떤 블록 안에도 포함되지 않은 영역을 뜻합니다. 즉, 컴포넌트가 실행될 때 항상 동일한 순서로 호출되는 위치여야 합니다.

  다음은 호출 위치를 잘못 사용한 예제입니다.

  ```typescript
  import { useState } from "react";

  export default function App() {
    const clickHandler = () => {
      const [count, setCount] = useState(0); // 오류 발생
      setCount(count + 1);
    };
    return (
      <button onClick={clickHandler}>클릭</button>
    )
  }
  ```

  예제에서는 useState 훅을 clickHandler()라는 이벤트 핸들러 내부에서 호출하고 있습니다. 이 코드는 리액트 훅의 규칙을 위반해 오류가 발생합니다.

  > 리액트 공식 문서에서는 리액트 훅을 사용할 때 반드시 지켜야 하는 규칙들을 훅의 규칙(rules of hooks)으로 정의하고 있습니다. 이 규칙은 useState뿐만 아니라 useEffect, useContext, useReducer 등 모든 리액트 훅에 동일하게 적용됩니다. 훅의 규칙에 관한 내용은 공식 문서(https://ko.react.dev/reference/rules/rules-of-hooks)에서 확인할 수 있습니다.

- 상태 변경 함수에서 값을 직접 전달할 때 주의할 점

  앞서 설명했듯이, 상태 변경 함수를 사용하는 방식에는 상태 값을 직접 전달하는 방식과 이전 상태 값을 참조하는 방식이 있습니다. 이 중에서도 값을 직접 전달하는 방식을 사용할 때 주의해야 할 점을 살펴보겠습니다.

  다음 예제를 봅시다.

  ```typescript
  import { useState } from "react";

  export default function App() {
    const [count, setCount] = useState(0);
    const clickHandler = () => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    };
    return (
      <div>
      <h1>Count: {count}</h1>
      <button onClick={clickHandler}>증가</button>
      </div>
    )
  }
  ```

  코드에서 버튼을 클릭하면 setCount() 함수가 3번 호출됩니다. 많은 사람이 버튼을 한 번 클릭할 때마다 3씩 증가할 것이라고 예상할 겁니다. 하지만 실제로 실행해보면 count는 1씩 증가합니다. 왜 이렇게 작동할까요?

  이러한 현상은 리액트의 상태 업데이트 방식 때문입니다. 리액트는 여러 상태 변경을 즉시 처리하지 않고 비동기적으로 처리해 렌더링이 끝난 뒤 한 번에 모아서 적용합니다. 이 방식을 일괄 업데이트(batch update)라고 하며, 불필요한 리렌더링을 줄여 성능을 최적화하는 방식입니다.

  예제 코드에서 setCount(count + 1)을 연속으로 3번 호출하더라도 세 번 모두 현재 count 값(예: 0)을 기준으로 1을 더하는 연산이 수행됩니다.

  즉, 0 + 1, 0 + 1, 0 + 1이 반복되기 때문에 결과적으로 마지막 호출 결과인 1만 적용됩니다.

  이는 리렌더링이 아직 발생하지 않은 상태에서 동일한 값을 기준으로 상태 변경을 요청했기 때문에 의도한 대로 동작하지 않는 것입니다.

  이 문제는 상태 변경 함수에 콜백 함수 형태를 사용하면 해결할 수 있습니다. 콜백 함수는 항상 이전 상태 값을 매개변수로 전달받기 때문에 그 값을 기반으로 새로운 상태를 안전하게 계산할 수 있습니다.

  ```typescript
  import { useState } from "react";

  export default function App() {
  const [count, setCount] = useState(0);
  const clickHandler = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };
  return (
    <div>
    <h1>Count: {count}</h1>
    <button onClick={clickHandler}>증가</button>
    </div>
  )
  }
  ```

  이 방식은 count에 각각 이전 상태 값이 전달되므로 버튼을 클릭할 때마다 정상적으로 3씩 증가합니다.

  물론, setCount(count + 3)처럼 한 번에 3을 더하는 방식도 가능합니다. 하지만 이 방식도 여전히 기준이 되는 count 값이 최신 상태가 아닐 수 있으므로 상태 변경이 연속적으로 일어나는 경우에는 이전 상태 값을 기반으로 계산하는 콜백 함수 형태가 더 안전합니다.

</details>

## 시연

🔗 https://mellow-entremet-ef0fae.netlify.app/
