<script setup lang = "ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue3-toastify/dist/index.css';
import {useTask} from "@/composables/Tasks";

const {tasks, currentTask, createTask, getTasks, deleteTask, updateTask, updateStatus} = useTask()

getTasks()

</script>

<template>
	<div class = "container main-container">
		<div class = "row">
			<div class = "col col-sm-12">
				<h1>Tasks <span class="fs-4">({{tasks.length}})</span></h1>
				
				<div class = "input-group mb-3">
					<input type = "text"
								 v-model = "currentTask"
								 class = "form-control" placeholder = "Task" aria-label = "Task"
								 aria-describedby = "button-task">
					<button class = "btn btn-outline-secondary" type = "button" id = "button-addon2" @click = "createTask">
						<i class="bi-plus"></i>
						Add
					</button>
				</div>
				<hr>
				<div class = "tasks">
					<div class = "input-group task-item" v-for = "task in tasks" v-bind:key = "task.id">
						<input type = "text" :class = "`form-control ${task.status==='DONE'?'done':''}`" readonly
									 :value = "task.task">
						<button type = "button" class = "btn btn-outline-secondary" @click = "deleteTask(task.id)">
							<i class="bi-x-lg"></i>
							Delete
						</button>
						<button type = "button" v-if = "task.status!=='DONE'"
										class = "btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
										data-bs-toggle = "dropdown" aria-expanded = "false">
							<span class = "visually-hidden">Toggle Dropdown</span>
						</button>
						<ul class = "dropdown-menu dropdown-menu-end">
							<li><a class = "dropdown-item" href = "#" @click = "updateTask(task.id,task.task)">Edit</a></li>
							<li>
								<hr class = "dropdown-divider">
							</li>
							<li><a class = "dropdown-item" href = "#"
										 @click = "updateStatus(task.id,'DONE')">Done</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scope>
.task-item {
	margin: 15px 0;
}

.done {
	text-decoration: line-through;
}
</style>