from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Task
import json

def home(request):
    tasks = Task.objects.all()
    return render(request, 'tasks/index.html', {'tasks': tasks})


def add_task(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        task = Task.objects.create(title=data['title'])
        return JsonResponse({
            'id': task.id,
            'title': task.title,
            'completed': task.completed
        })


def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return JsonResponse({'message': 'deleted'})


def complete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.completed = not task.completed
    task.save()
    return JsonResponse({'completed': task.completed})