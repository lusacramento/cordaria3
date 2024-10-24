<template>
	<header
		id="header"
		class="row d-flex justify-content-around align-items-center"
	>
		<div class="col">
			<slot name="left" class=""></slot>
		</div>
		<div class="col-auto">
			<slot name="center" class=""></slot>
		</div>
		<div class="col">
			<slot name="right" class="4"></slot>
		</div>
	</header>
</template>
