title: 欧拉公式の推导
uuid: 642909b3-f94f-05bc-a021-3955d89b6c57
reward: true
toc: false
tags: math
date: 2019-07-27 15:48:56
math: true
---
![Euler](https://upload.wikimedia.org/wikipedia/commons/6/60/Leonhard_Euler_2.jpg)
<!---more--->
### Euler's formula: 
$$
\Large{e^{ix}=cosx+isinx
\xrightarrow{x=\pi}
e^{\pi i}+1=0}
$$
This formula called `created by god`, because it contain $e\quad\pi\quad1$.

### How the formula come from?
This answer is **Taloyr**
$$
\underset{x \to x_{0}}{\lim}f(x)=\sum_{i=0}^{n}\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n+o(x^n)
$$
when $x_0$ equals $0$, the formula transform to
$$
\underset{x \to 0}{\lim}f(x)=\sum_{i=0}^{n}\frac{f^{(n)}(0)}{n!}x^n+o(x^n)
$$

Here's three items about $e^x\quad sinx\quad cosx$

$
\small{e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+...+\frac{x^n}{n!}}
$

$
\small{sinx=x-\frac{x^3}{3!}+\frac{x^5}{5!}+O(x^5)}
$

$
\small{cosx=1-\frac{x^2}{2!}+\frac{x^4}{4!}+O(x^4)}
$

At the first equaltion we replace the partation of $x$ with $ix$
and the orgainal equaltion become to

$
e^{ix}=1+ix-\frac{x^2}{2!}-i\frac{x^3}{3!}+\frac{x^4}{4!}+i\frac{x^5}{5!}+...+\frac{x^{in}}{in!}\Rightarrow e^{ix}=\left(1-\frac{x^2}{2!}+\frac{x^4}{4!}+O(x^4)\right)+\left(ix-i\frac{x^3}{3!}+i\frac{x^5}{5!}+O(x^5)\right)
$

that is $e^{ix}=cosx+isinx$