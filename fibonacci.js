function nthFibo(num) {
	if (num < 2) return 0;
	if (num === 2) return 1;
	let sum = 0;
	let prev = 0;
	let last = 1;

	for (let i = 2; i < num; i += 1) {
		sum = prev + last;
		prev = last;
		last = sum;
	}
	return sum;
}
[4, 10, 20, 32, 54].forEach((n) => console.log(`number ${n}: `, nthFibo(n)));
